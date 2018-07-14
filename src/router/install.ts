import {
  createBrowserHistory,
  createHashHistory,
  createMemoryHistory,
  MemoryHistory,
  History
} from 'history';
import { install } from 'mobx-little-router-react';
import { PoaRoutesConfig, PoaAppConfig } from '../core';

export interface MobxLittleRouterConfig {
  history: History | MemoryHistory;
  routes: PoaRoutesConfig[];
  getContext: Function;
}

export function installRouter(config: MobxLittleRouterConfig) {
  return install(config);
}

export function createRouterInstallConfig(
  config: PoaAppConfig,
  injectionData: any
): MobxLittleRouterConfig {
  const routerConfig = config.router;

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
