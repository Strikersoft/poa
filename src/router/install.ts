import {
  createBrowserHistory,
  createHashHistory,
  createMemoryHistory,
  MemoryHistory,
  History
} from 'history';
import { install } from 'mobx-little-router-react';
import { PoaRoutesConfig, PoaAppConfig } from '../core';
import { getStore, getActions, getEnv } from '../state/globals';

export interface MobxLittleRouterConfig {
  history: History | MemoryHistory;
  routes: PoaRoutesConfig[];
  getContext: Function;
}

export function installRouter(config: MobxLittleRouterConfig) {
  return install(config);
}

export function createRouterInstallConfig(config: PoaAppConfig): MobxLittleRouterConfig {
  const routerConfig = config.router;

  const getContext = () => {
    const injectedData = {
      store: getStore(),
      actions: getActions(),
      env: getEnv()
    };

    if (routerConfig.context) {
      return Object.assign({}, routerConfig.context(), injectedData);
    }

    return injectedData;
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
