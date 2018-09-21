import { InitOptions, i18n, TranslationFunction } from 'i18next';
import { IReactComponent } from 'mobx-react';
import { RavenOptions } from 'raven-js';
import { Location } from 'history';

export interface Route {
  context: any;
  [key: string]: any;
}

export interface Navigation {
  redirectTo: (path: string) => any;
  to: Location;
  [key: string]: any;
}

export interface PoaRoutesConfig {
  path: string;
  component?: IReactComponent;
  redirectTo?: string;
  canActivate?: (route: Route, navigation: Navigation) => any;
  willResolve?: (route: Route, navigation: Navigation) => Promise<any>;
}

export enum PoaRouterType {
  Browser = 'browser',
  Hash = 'hash',
  Memory = 'memory'
}

export interface PoaRouterConfig {
  type?: PoaRouterType;
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

export interface PoaRavenOptions extends RavenOptions {
  dsn: string;
  version: string;
}

export interface PoaAppBootConfig {
  react?: PoaReactConfig;
  router?: PoaRouterConfig;
  state?: PoaStateConfig;
  i18n?: InitOptions;
  env?: any;
  raven?: PoaRavenOptions;

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

interface ConfigureI18NextHook {
  i18next: i18n;
  t: TranslationFunction;
}

interface ConfigureAppInstanceHook {
  poaApp: JSX.Element;
}

export interface PoaAppConfig {
  react: PoaReactConfig;
  router: PoaRouterConfig;
  state: PoaStateConfig;
  i18n: InitOptions;
  raven?: PoaRavenOptions;
  env: any;

  hooks: {
    configureI18Next: ({ i18next, t }: ConfigureI18NextHook) => Promise<any>;
    // prettier-ignore
    configureAppInstance: ({ poaApp }: ConfigureAppInstanceHook) => Promise<JSX.Element | void> | JSX.Element | void ;
  };
}
