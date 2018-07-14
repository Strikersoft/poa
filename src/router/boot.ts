import {
  createBrowserHistory,
  createHashHistory,
  createMemoryHistory,
  MemoryHistory,
  History
} from 'history';
import { install } from 'mobx-little-router-react';
import { PoaRoutesConfig, PoaAppConfig } from '../core/interfaces/app-config.interface';
import { ComponentsInjector } from '../core/repository';

export { History, MemoryHistory } from 'history';

export namespace RouterBoot {
  interface MobxLittleRouterConfig {
    history: History | MemoryHistory;
    routes: PoaRoutesConfig[];
    getContext: Function;
  }

  function installRouter(config: MobxLittleRouterConfig) {
    return install(config);
  }

  function createRouterInstallConfig(
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

  let installedRouter: any;

  export function getRouter() {
    return installedRouter;
  }

  export interface RouterBootResult {
    router: any;
    history: History | MemoryHistory;
  }

  export async function boot(
    config: PoaAppConfig,
    injectionData: any = {}
  ): Promise<RouterBootResult> {
    const routerConfig = createRouterInstallConfig(config, injectionData);

    installedRouter = installRouter(routerConfig);
    await startRouter(installedRouter);

    // inject router to all registered components
    ComponentsInjector.injectPropertyToAllComponents((component: any) => {
      component.prototype.router = getRouter();
    });

    return { router: installedRouter, history: routerConfig.history };
  }

  export function startRouter(router: any) {
    return new Promise(resolve => router.start(resolve));
  }
}
