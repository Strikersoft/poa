import { MemoryHistory, History } from 'history';
import { PoaAppConfig } from '../core/interfaces/app-config.interface';
import { ComponentsInjector } from '../core/repository';
import { createRouterInstallConfig, installRouter } from './install';

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
