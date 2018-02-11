interface PoaRoute {
  path: string;
  component: any;
  redirectTo?: string;

  // FIXME: provide correct interface
  [x: string]: any;
}

interface PoaAppConfig {
  router?: {
    type?: 'browser' | 'hash';
    routes?: PoaRoute[];
  };
  state?: { initial: any; actions: any };
  env?: any;
}

export function boot(config: PoaAppConfig): Promise<void>;
