import { logger } from '../logger-lib/logger';
import { observer } from 'mobx-react';
import { addComponentToRegistry } from '../components-registry';
import { createHashHistory, createBrowserHistory, History } from 'history';
import { PoaBootConfig } from '../poa.interfaces';
export { Link } from './link';

const log = logger.get('poa-router');

export enum PoaRouteResolveStratery {
  wait,
  nonwait
}

export interface PoaRouteDecorator {
  path: string;
  exact?: boolean;
  onActivate?: (actions: {}) => Promise<boolean | string | void>;
  // tslint:disable-next-line:no-any
  loading?: () => any;
  // tslint:disable-next-line:no-any
  error?: () => any;
  resolveStrategy?: PoaRouteResolveStratery;
  namespaces?: string[];
}

export interface PoaRouteConfig extends PoaRouteDecorator {
  // tslint:disable-next-line:no-any
  component: any;
}

export let userRoutes: PoaRouteConfig[] = [];

export function Route(config: PoaRouteDecorator) {
  // tslint:disable-next-line:no-any
  return function PoaRoute(constructor: any) {
    const routeConfig: PoaRouteConfig = {
      exact: true,
      component: constructor,
      resolveStrategy: PoaRouteResolveStratery.wait,
      ...config
    };

    userRoutes.push(routeConfig);

    addComponentToRegistry(constructor);
    constructor.prototype.tNamespaces = config.namespaces;

    return observer(constructor);
  };
}

let browserHistoryType: History;

export function getHistory() {
  return browserHistoryType;
}

export async function routerBoot(config: PoaBootConfig) {
  if (config.router.hashRouter) {
    browserHistoryType = createHashHistory();
  } else {
    browserHistoryType = createBrowserHistory();
  }

  return browserHistoryType;
}

export function resetRouterGlobals() {
  userRoutes = [];
}
