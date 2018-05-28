import * as React from 'react';

import { boot as routerBoot, PoaApp } from '@poa/router';
import { boot as stateBoot } from '@poa/state';
import { boot as i18nBoot } from '@poa/i18n';

import { render } from './utils';
import { createDefaultConfig } from './config';
import { injectPropertyToAllComponents } from './repository';
import { PoaAppConfig } from './interfaces/app-config.interface';

export async function boot(userConfig?: PoaAppConfig) {
  const config = createDefaultConfig(userConfig);

  // if application have async bootstrap
  if (config.react.loadingComponent) {
    await render(<config.react.loadingComponent />, config.react.htmlNode);
  }

  // initialize localication
  await i18nBoot(config.i18n, injectPropertyToAllComponents);

  // initialize state (await on all initialAction subscribers)
  const { store, actions, env } = await stateBoot(config, injectPropertyToAllComponents);

  // initialize router
  const { router } = await routerBoot(
    config.router,
    { store, actions, env },
    injectPropertyToAllComponents
  );

  // render main application
  const App: any = PoaApp;
  await render(<App router={router} />, config.react.htmlNode);
}
