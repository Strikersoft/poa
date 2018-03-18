// @ts-check

import { createBrowserHistory, createHashHistory, createMemoryHistory } from 'history';
import { install } from 'mobx-little-router-react';

function installRouter(config) {
  return install(config);
}

// TOOD: inject actions, env, store
function createRouterInstallConfig(routerConfig, injectionData) {
  const getContext = () => {
    if (routerConfig.context) {
      return Object.assign({}, routerConfig.context(), injectionData);
    }

    return injectionData;
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

export async function boot(config, injectionData = {}, componentsInjector) {
  const routerConfig = createRouterInstallConfig(config, injectionData);
  installedRouter = installRouter(routerConfig);

  // inject router to all registered components
  componentsInjector(component => {
    component.prototype.router = getRouter();
  });

  await startRouter(installedRouter);

  return { router: installedRouter, history: routerConfig.history };
}

export function startRouter(router) {
  return new Promise(resolve => router.start(resolve));
}
