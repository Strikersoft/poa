import * as React from 'react';
import { Switch, BrowserRouter, HashRouter, Redirect } from 'react-router-dom';

import { reactDomPromisify } from './utils/react-dom-wrapper';
import { routerBoot, userRoutes } from './router-lib/router';
import { logger } from './logger-lib/logger';
import { InternalPoaRoute } from './router-lib/route';
import { bootstrapLocalization, PoaI18nOpts } from './i18next-lib/i18next';
import { bootstrapState } from './state-lib/state';

const log = logger.get('poa-bootstrap');

export interface PoaBootConfig {
  react: { htmlNode: HTMLElement };
  router?: { hashRouter?: boolean; initialRoute?: string };
  i18n?: PoaI18nOpts;
  // TODO: add typing for state
  // tslint:disable-next-line:no-any
  state?: { initial: {}; actions: any };
  // tslint:disable-next-line:no-any
  env?: any;
}

class PoaApp extends React.Component<{ config: PoaBootConfig }> {
  wasInitiallyRedirected: boolean = false;

  performInitialRedirect(route: string) {
    return <Redirect to={route} />;
  }

  render() {
    const { config } = this.props;

    const routes = userRoutes.map(route => {
      return (
        <InternalPoaRoute
          exact={route.exact}
          key={route.path}
          path={route.path}
          config={route}
          // tslint:disable-next-line:no-any
          render={(...args: any[]) => {
            // initial redirect
            if (config.router && config.router.initialRoute && !this.wasInitiallyRedirected) {
              this.wasInitiallyRedirected = true;
              return <Redirect exact={true} from="/" to={config.router.initialRoute} />;
            }

            return <route.component {...args} />;
          }}
        />
      );
    });

    if (config.router && config.router.hashRouter) {
      return (
        <HashRouter>
          <Switch>{routes}</Switch>
        </HashRouter>
      );
    }

    return (
      <BrowserRouter>
        <Switch>{routes}</Switch>
      </BrowserRouter>
    );
  }
}

export async function boot(config: PoaBootConfig) {
  log.debug('DOM bootstraped');
  await routerBoot();
  log.debug('Router bootstraped');
  await bootstrapLocalization(config.i18n || {});
  log.debug('Localization bootstraped');

  if (config.state) {
    await bootstrapState(config.state.initial, config.state.actions, config.env);

    log.debug('state bootstraped');
  }

  log.debug('bootsraping..');
  await reactDomPromisify(<PoaApp config={config} />, config.react.htmlNode);
}
