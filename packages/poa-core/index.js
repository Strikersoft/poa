// @ts-check
import React from 'react';

// @poa/router
import { boot as routerBoot, PoaApp } from '@poa/router';

// @poa/state
import { boot as stateBoot } from '@poa/state';

import { render } from './utils';
import { createDefaultConfig } from './config';

export async function boot(config) {
  const configWithDefaults = createDefaultConfig(config);

  // if application have async bootstrap, better to display some loading
  if (configWithDefaults.react.loadingComponent) {
    await render(<config.react.loadingComponent />, config.react.htmlNode);
  }

  await stateBoot(config);

  const { router } = await routerBoot(configWithDefaults.router);
  await render(<PoaApp router={router} />, configWithDefaults.react.htmlNode);
}
