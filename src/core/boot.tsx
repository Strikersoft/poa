import * as React from 'react';
import * as Raven from 'raven-js';

import { boot as routerBoot } from '../router';
import { boot as stateBoot } from '../state';
import { boot as i18nBoot } from '../i18n';
import { PoaApp } from '../router';

import { createDefaultConfig } from './config';
import { PoaAppBootConfig } from './interfaces/app-config.interface';
import { PoaAppConfig } from '.';
import { render } from '../utils/dom';

export async function boot(userConfig?: PoaAppBootConfig): Promise<PoaAppConfig> {
  const config = createDefaultConfig(userConfig);

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

  // initialize localication
  const { t, i18next } = await i18nBoot(config);

  // add ability for end-user to configure i18next
  await config.hooks.configureI18Next({ t, i18next });

  // initialize state (await on all initialAction subscribers)
  const { store, actions, env } = await stateBoot(config);

  // initialize router
  const { router } = await routerBoot(config, { store, actions, env });

  // poa default root component
  const AppInstance = <PoaApp router={router} />;

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
