import { createBrowserHistory, createHashHistory, createMemoryHistory, History } from 'history';
import { install, Outlet, RouterProvider } from 'mobx-little-router-react';
import { PoaBootConfig, RouterType, PoaRouteBootConfig } from '../poa.interfaces';
import { getStore, getActions } from '../state-lib/state';
import { addComponentToRegistry, injectPropertyToAllComponents } from '../components-registry';
import { translatorFuncCreator } from '../i18next-lib/i18next';

export type NavigationDescriptor = {
  type: NavigationType;
  sequence?: number;
  to: any;
  from?: any;
  shouldTransition?: boolean;
  leaf?: Route;
};

export interface Route {
  key: string;
  value: string;
  data: any;
  context: any;
  params: any;
  query: any;
  segment: string;
  parentUrl: string;
}

export interface Navigation {
  type: any;
  to: any;
  from: any;
  sequence: number;
  shouldTransition: boolean;
  leaf?: Route;

  next(next: NavigationDescriptor): any;
  prev(): any;
  redirectTo(href: any): Promise<void>;
  raise(klass: any, ...opts: any[]): Promise<void>;
  goBack(): Promise<void>;
}

export interface RouteConfig {
  path: string;
  component: any;
  query?: Array<string>;
  key?: string;
  children?: RouteConfig[];
  loadChildren?: any;
  match?: 'full' | 'partial';
  canActivate?: (route: Route, navigation: Navigation) => boolean | Promise<boolean>;
  canDeactivate?: (route: Route, navigation: Navigation) => boolean | Promise<boolean>;
  willActivate?: (route: Route, navigation: Navigation) => Promise<void>;
  willDeactivate?: (route: Route, navigation: Navigation) => Promise<void>;
  willResolve?: (route: Route, navigation: Navigation) => Promise<void> | Promise<() => any> | void;
  onError?: (route: Route, navigation: Navigation, error: any) => Promise<any>;
  onTransition?: any;
  onEnter?: (route: Route) => Promise<any>;
  onExit?: (route: Route) => Promise<any>;
  getContext?: () => any;
  getData?: () => any;
  etc?: any;
  [key: string]: any;
}

export interface BootedRouter {
  router: Router;
  history: History;
}

export interface Router {
  start(callback: () => void): any;
  push(path: string): void;
  replace(path: string): void;
  goBack(): void;
}

interface RouterInstallConfig {
  history: History;
  routes: RouteConfig[];
  getContext: () => {};
}

function installRouter(config: RouterInstallConfig): Router {
  return install(config);
}

function createRouterInstallConfig(routerConfig: PoaRouteBootConfig): RouterInstallConfig {
  const getContext = () => {
    if (routerConfig.context) {
      return { ...routerConfig.context(), store: getStore(), actions: getActions() };
    }

    return { store: getStore(), actions: getActions() };
  };

  switch (routerConfig.type) {
    case RouterType.hash:
      return { history: createHashHistory(), routes: routerConfig.routes, getContext };
    case RouterType.memory:
      return { history: createMemoryHistory(), routes: routerConfig.routes, getContext };
    default:
      return { history: createBrowserHistory(), routes: routerConfig.routes, getContext };
  }
}

let installedRouter: Router;

export function getRouter() {
  return installedRouter;
}

const flatten = (list: any[]): any[] =>
  list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

export async function bootRouter(config: PoaBootConfig): Promise<BootedRouter> {
  const routerConfig: RouterInstallConfig = createRouterInstallConfig(config.router);
  installedRouter = installRouter(routerConfig);

  flatten(routerConfig.routes).forEach((route: RouteConfig) => {
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
      if (route.component[hook]) {
        route[hook] = route.component[hook];
      }
    });
  });

  await startRouter(installedRouter);

  return { router: installedRouter, history: routerConfig.history };
}

export function startRouter(router: Router): Promise<void> {
  return new Promise(resolve => router.start(resolve));
}
