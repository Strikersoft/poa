import * as React from 'react';
import { Switch, Router, Redirect, MemoryRouter } from 'react-router';
import { createBrowserHistory, createHashHistory, History } from 'history';

import { reactDomPromisify } from './utils/react-dom-wrapper';
import {
  routerBoot,
  userRoutes,
  Route,
  PoaRouteResolveStrategy,
  resetRouterGlobals,
  PoaRouteConfig
} from './router-lib/router';
import { Component } from './component';
import { logger } from './logger-lib/logger';
import { InternalPoaRoute } from './router-lib/route';
import { bootstrapLocalization, PoaI18nOpts, Translator } from './i18next-lib/i18next';
import {
  bootstrapState,
  createAction,
  addMutator,
  addSideEffects,
  initAction,
  resetStateGlobals,
  addMiddleware,
  getStore
} from './state-lib/state';
import { Link, NavLink } from './router-lib/link';
import { PoaBootConfig } from './poa.interfaces';

const log = logger.get('poa-bootstrap');

class PoaApp extends React.Component<{ config: PoaBootConfig; history: History }> {
  wasInitiallyRedirected: boolean = false;

  componentDidCatch(error: any, info: any) {
    log.error(error, info);
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
            if (config.router.initialRoute && !this.wasInitiallyRedirected) {
              this.wasInitiallyRedirected = true;
              return <Redirect exact={true} from="/" to={config.router.initialRoute} />;
            }

            return <route.component {...args} />;
          }}
        />
      );
    });

    if (config.router.memoryRouter) {
      return (
        <MemoryRouter {...config.router.memoryRouterProps}>
          <Switch>{routes}</Switch>
        </MemoryRouter>
      );
    }

    return (
      <Router history={this.props.history}>
        <Switch>{routes}</Switch>
      </Router>
    );
  }
}

export async function boot(config: PoaBootConfig) {
  if (config.react.loadingComponent) {
    await reactDomPromisify(<config.react.loadingComponent />, config.react.htmlNode);
  }

  const browserHistoryType = await routerBoot(config);
  await bootstrapLocalization(config.i18n || {});

  if (config.state) {
    await bootstrapState(config.state.initial, config.state.actions, config.env);
  }

  await reactDomPromisify(
    <PoaApp config={config} history={browserHistoryType} />,
    config.react.htmlNode
  );
}

// TODO: use correct state interface not on demand
export async function testBoot(
  state?: { initial: any; actions: any },
  htmlNode = document.createElement('div'),
  loading?: any
) {
  await boot({
    react: { htmlNode, loadingComponent: loading },
    router: {
      memoryRouter: true,
      memoryRouterProps: { initialEntries: ['/'] }
    },
    state: state
  });

  return htmlNode;
}

export {
  Component,
  Translator,
  addMiddleware,
  createAction,
  addMutator,
  addSideEffects,
  PoaRouteResolveStrategy,
  initAction
};

// Router
export { NavLink, Link, Route };

export function resetPoaGlobals() {
  resetRouterGlobals();
  resetStateGlobals();
}

// Mobx
import {
  observable,
  computed as mobxComputed,
  action,
  when,
  autorun,
  autorunAsync,
  IComputedValue
} from 'mobx';
import { observer, Observer } from 'mobx-react';

export const computed = (fn: Function) => mobxComputed(() => fn({ store: getStore() }));

export { observable, action, when, autorun, autorunAsync, IComputedValue, observer, Observer };
