import { routerBoot } from '@poa/router';

const defaultConfig = {
  router: {
    type: 'browser',
    routes: []
  }
};

export async function boot(config) {
  // use sensitive defaults
  const configWithDefault = Object.assign({}, defaultConfig, config);

  await routerBoot(configWithDefault.router);
}
