// @ts-check

import React from 'react';

import { boot as routerBoot, PoaApp } from '@poa/router';
import { boot as stateBoot } from '@poa/state';

import { render } from './utils';
import { createDefaultConfig } from './config';
import { injectPropertyToAllComponents } from './repository';

export async function boot(config) {
  const configWithDefaults = createDefaultConfig(config);

  // if application have async bootstrap
  if (configWithDefaults.react.loadingComponent) {
    await render(<config.react.loadingComponent />, configWithDefaults.react.htmlNode);
  }

  // initialize state (await on all initialAction subscribers)
  await stateBoot(configWithDefaults, injectPropertyToAllComponents);

  // initialize router
  const { router } = await routerBoot(configWithDefaults.router);

  // render main application
  await render(<PoaApp router={router} />, configWithDefaults.react.htmlNode);
}
