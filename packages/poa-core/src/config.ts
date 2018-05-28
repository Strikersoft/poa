import { PoaAppConfig, PoaRouterType } from './interfaces/app-config.interface';
import { helloComponent } from './hello.component';

export function createDefaultConfig(config?: PoaAppConfig) {
  const defaultConfig = {
    react: { htmlNode: document.getElementById('root'), loadingComponent: null },
    router: {
      type: PoaRouterType.Browser,
      routes: [
        {
          path: '',
          component: helloComponent
        }
      ]
    },
    state: {
      initial: {},
      actions: {}
    },
    i18n: {},
    env: {}
  };

  return Object.assign({}, defaultConfig, config);
}
