import { InitOptions } from 'i18next';

export interface PoaRouteConfig {
  path: string;
  component: any;
}

export enum PoaRouterType {
  Browser = 'browser',
  Hash = 'hash'
}

export interface PoaRouterConfig {
  type: PoaRouterType;
  routes?: PoaRouteConfig[];
}

export interface PoaReactConfig {
  htmlNode?: HTMLElement | null;
  loadingComponent?: any;
}

export interface PoaStateConfig {
  initial: any;
  actions: any;
}

export interface PoaAppConfig {
  react?: PoaReactConfig;
  router?: PoaRouterConfig;
  state?: PoaStateConfig;
  i18n?: InitOptions;
  env?: any;
}
