import { InitOptions, i18n, TranslationFunction } from 'i18next';
import { IReactComponent } from 'mobx-react';

export interface Route {
  context: any;
  [key: string]: any;
}

export interface Navigation {
  redirectTo: (path: string) => any;
  [key: string]: any;
}

export interface PoaRoutesConfig {
  path: string;
  component?: IReactComponent;
  redirectTo?: string;
  canActivate?: (route: Route, navigation: Navigation) => any,
  willResolve?: (route: Route, navigation: Navigation) => Promise<any>
}

export enum PoaRouterType {
  Browser = 'browser',
  Hash = 'hash',
  Memory = 'memory'
}

export interface PoaRouterConfig {
  type: PoaRouterType;
  context?: Function;
  routes: PoaRoutesConfig[];
}

export interface PoaReactConfig {
  htmlNode: HTMLElement | null;
  loadingComponent?: any;
}

export interface PoaStateConfig {
  initial: any;
  actions: any;
}

export interface PoaAppBootConfig {
  react?: PoaReactConfig;
  router?: PoaRouterConfig;
  state?: PoaStateConfig;
  i18n?: InitOptions;
  env?: any;

  hooks?: {
    configureI18Next?: (
      {
        i18next,
        t
      }: {
        i18next: i18n;
        t: TranslationFunction;
      }
    ) => Promise<any>;
    configureAppInstance?: (
      {
        poaAppInstance
      }: {
        poaAppInstance: any;
      }
    ) => Promise<any>;
  };
}

export interface PoaAppConfig {
  react: PoaReactConfig;
  router: PoaRouterConfig;
  state: PoaStateConfig;
  i18n: InitOptions;
  env: any;

  hooks: {
    configureI18Next: (
      {
        i18next,
        t
      }: {
        i18next: i18n;
        t: TranslationFunction;
      }
    ) => Promise<any>;
    configureAppInstance: (
      {
        poaAppInstance
      }: {
        poaAppInstance: any;
      }
    ) => Promise<any>;
  };
}
