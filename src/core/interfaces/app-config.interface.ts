import { InitOptions, i18n, TranslationFunction } from 'i18next';

export interface PoaRouteConfig {
  path: string;
  component: any;
}

export enum PoaRouterType {
  Browser = 'browser',
  Hash = 'hash',
  Memory = 'memory'
}

export interface PoaRouterConfig {
  type: PoaRouterType;
  context?: Function;
  routes: PoaRouteConfig[];
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
