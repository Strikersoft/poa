import * as React from 'react';

import { RouterBoot, PoaApp } from '../router';
import { StateBoot } from '../state';
import { i18nBoot } from '../i18n';

import { createDefaultConfig } from './config';
import { PoaAppBootConfig } from './interfaces/app-config.interface';
import { PoaAppConfig } from '.';
import { render } from '../utils/dom';

export async function boot(userConfig?: PoaAppBootConfig): Promise<PoaAppConfig> {
  const config = createDefaultConfig(userConfig);

  // if application have async bootstrap
  if (config.react.loadingComponent) {
    await render(<config.react.loadingComponent />, config.react.htmlNode);
  }

  // initialize localication
  const { t, i18next } = await i18nBoot.boot(config);

  // add ability for end-user to configure i18next
  await config.hooks.configureI18Next({ t, i18next });

  // initialize state (await on all initialAction subscribers)
  const { store, actions, env } = await StateBoot.boot(config);

  // initialize router
  const { router } = await RouterBoot.boot(config, { store, actions, env });

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
