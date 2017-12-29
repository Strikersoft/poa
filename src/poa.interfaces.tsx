import { History } from 'history';
import { PoaI18nOpts } from './i18next-lib/i18next';
import { RouteConfig } from './router-lib/router';

export enum RouterType {
  hash = 'hash',
  memory = 'memory',
  browser = 'browser'
}

export interface PoaRouteBootConfig {
  type: RouterType;
  routes: RouteConfig[];
  context?: () => any;
}

export interface PoaBootConfig {
  react?: { htmlNode: HTMLElement; loadingComponent?: any };
  router: PoaRouteBootConfig;
  i18n?: PoaI18nOpts;
  // TODO: add typing for state
  // tslint:disable-next-line:no-any
  state?: { initial: {}; actions: any };
  // tslint:disable-next-line:no-any
  env?: any;
}
