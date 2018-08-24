import * as React from 'react';
import * as Raven from 'raven-js';

import { boot as routerBoot } from '../router/boot';
import { boot as stateBoot } from '../state/boot';
import { boot as i18nBoot } from '../i18n/boot';

import { PoaApp } from '../router/app';
import { createDefaultConfig } from './config';
import { PoaAppBootConfig } from './interfaces/app-config.interface';
import { render } from '../utils/dom';
import { PoaAppConfig } from '.';
import PoaAppState from './global-state';

export async function boot(userConfig?: PoaAppBootConfig): Promise<PoaAppConfig> {
  const config = createDefaultConfig(userConfig);

  if (process.env.NODE_ENV === 'development') {
    PoaAppState.markAsDevMode();
  }

  // if application want to use Sentry
  if (config.raven) {
    const { dsn, version, ...rest } = config.raven;

    Raven.config(dsn, { release: version || '1.0.0', ...rest });

    config.env.raven = Raven;
  }

  // if application have async bootstrap
  if (config.react.loadingComponent) {
    await render(<config.react.loadingComponent />, config.react.htmlNode);
  }

  // initialize localization
  const { t, i18next } = await i18nBoot(config);

  // add ability for end-user to configure i18next
  await config.hooks.configureI18Next({ t, i18next });

  // initialize state (await on all initialAction subscribers)
  await stateBoot(config);

  // initialize router
  const { router } = await routerBoot(config);

  // poa default root component
  const AppInstance = <PoaApp router={router} />;

  // add ability to end-user to configure root app component
  // also pass poa app
  const NewAppInstance = await config.hooks.configureAppInstance({
    poaApp: AppInstance
  });

  // when end-user provides new root component -> use it!
  if (NewAppInstance) {
    await render(NewAppInstance, config.react.htmlNode);
  } else {
    await render(AppInstance, config.react.htmlNode);
  }

  PoaAppState.markAsBooted();

  return config;
}
