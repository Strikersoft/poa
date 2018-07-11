import { PoaAppConfig, PoaAppBootConfig, PoaRouterType } from './interfaces/app-config.interface';
import { HelloComponent } from './hello.component';

export function createDefaultConfig(config?: PoaAppBootConfig): PoaAppConfig {
  const defaultConfig = {
    react: { htmlNode: document.getElementById('root'), loadingComponent: null },
    router: {
      type: PoaRouterType.Browser,
      routes: [
        {
          path: '',
          component: HelloComponent
        }
      ]
    },
    state: {
      initial: {},
      actions: {}
    },
    i18n: {},
    env: {},
    hooks: {
      configureI18Next: () => Promise.resolve(),
      configureAppInstance: () => Promise.resolve()
    }
  };

  return Object.assign({}, defaultConfig, config);
}