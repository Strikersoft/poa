import * as React from 'react';

import { boot as routerBoot, PoaApp } from '@poa/router';
import { boot as stateBoot } from '@poa/state';
import { boot as i18nBoot } from '@poa/i18n';

import { render } from './utils';
import { createDefaultConfig } from './config';
import { ComponentsInjector } from './repository';
import { PoaAppBootConfig } from './interfaces/app-config.interface';
import { PoaAppConfig } from '../dist/poa-core/src';

export async function boot(userConfig?: PoaAppBootConfig): Promise<PoaAppConfig> {
  const config = createDefaultConfig(userConfig);

  // if application have async bootstrap
  if (config.react.loadingComponent) {
    await render(<config.react.loadingComponent />, config.react.htmlNode);
  }

  // initialize localication
  const { t, i18next } = await i18nBoot(config, ComponentsInjector);

  // add ability for end-user to configure i18next
  await config.hooks.configureI18Next({ t, i18next });

  // initialize state (await on all initialAction subscribers)
  const { store, actions, env } = await stateBoot(
    config,
    ComponentsInjector.addComponentToRegistry
  );

  // initialize router
  const { router } = await routerBoot(
    config,
    { store, actions, env },
    ComponentsInjector.addComponentToRegistry
  );

  // render main application
  // FIXME: avoid this workaround with types
  const App: any = PoaApp;
  // poa default root component
  const AppInstance = <App router={router} />;

  // add ability to end-user to configure root app component
  // also pass poa app
  const NewAppInstance: any = await config.hooks.configureAppInstance({
    poaAppInstance: AppInstance
  });

  // when end-user provides new root component -> use it!
  if (NewAppInstance) {
    await render(NewAppInstance, config.react.htmlNode);
  } else {
    await render(AppInstance, config.react.htmlNode);
  }

  return config;
}
