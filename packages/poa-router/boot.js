// @ts-check

import { createBrowserHistory, createHashHistory, createMemoryHistory } from 'history';
import { install } from 'mobx-little-router-react';

function installRouter(config) {
  return install(config);
}

function createRouterInstallConfig(routerConfig) {
  const getContext = () => {
    if (routerConfig.context) {
      return Object.assign({}, routerConfig.context());
    }

    return {};
  };

  switch (routerConfig.type) {
    case 'hash':
      return { history: createHashHistory(), routes: routerConfig.routes, getContext };
    case 'memory':
      return { history: createMemoryHistory(), routes: routerConfig.routes, getContext };
    default:
      return { history: createBrowserHistory(), routes: routerConfig.routes, getContext };
  }
}

let installedRouter;

export function getRouter() {
  return installedRouter;
}

const flatten = list => list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

export async function boot(config) {
  const routerConfig = createRouterInstallConfig(config);
  installedRouter = installRouter(routerConfig);

  flatten(routerConfig.routes).forEach(route => {
    const overridingHooks = [
      'canActivate',
      'canDeactivate',
      'willActivate',
      'willDeactivate',
      'willResolve',
      'onError',
      'onTransition',
      'onEnter',
      'onExit',
      'getData'
    ];

    overridingHooks.forEach(hook => {
      if (route.component && route.component[hook]) {
        route[hook] = route.component[hook];
      }
    });
  });

  await startRouter(installedRouter);

  return { router: installedRouter, history: routerConfig.history };
}

export function startRouter(router) {
  return new Promise(resolve => router.start(resolve));
}
