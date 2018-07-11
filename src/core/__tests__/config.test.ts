import { createDefaultConfig } from '../config';
import { PoaAppBootConfig, PoaRouterType } from '../interfaces/app-config.interface';

describe('CORE — Config', () => {
  it(`creates config without arguments`, () => {
    expect(createDefaultConfig()).toMatchSnapshot();
  });

  it(`merges defaultConfig with condig provided as argument`, () => {
    const config: PoaAppBootConfig = {
      env: { test: {} },
      hooks: {
        configureAppInstance: () => Promise.resolve(1),
        configureI18Next: () => Promise.resolve(2)
      },
      i18n: {},
      react: { htmlNode: {} as any, loadingComponent: {} as any },
      router: { type: PoaRouterType.Memory, routes: [] },
      state: { initial: { test: 'value' }, actions: { the: 'action' } }
    };

    expect(createDefaultConfig(config)).toMatchSnapshot();
    expect(createDefaultConfig(config)).toEqual(config);
  });

  it(`merges deep objects`, () => {
    const config: PoaAppBootConfig = {
      env: { test: 'value' }
    };

    expect(createDefaultConfig(config).env).toHaveProperty('te123st');
    // expect(createDefaultConfig(config)).toEqual(config);
  });
});
