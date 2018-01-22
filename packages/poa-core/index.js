// @ts-check
import React from 'react';
import { boot as routerBoot } from '@poa/router';
import { PoaApp } from '@poa/router';

import { render } from './utils';
import { createDefaultConfig } from './config';

export async function boot(config) {
  const configWithDefaults = createDefaultConfig(config);

  // if application have async bootstrap, better to display some loading
  if (configWithDefaults.react.loadingComponent) {
    await render(<config.react.loadingComponent />, config.react.htmlNode);
  }

  const { router } = await routerBoot(configWithDefaults.router);
  await render(<PoaApp router={router} />, configWithDefaults.react.htmlNode);
}
