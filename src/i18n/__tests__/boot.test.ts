import * as i18next from 'i18next';
import { boot, createTranslator } from '../boot';
import { createDefaultConfig } from '../../core/config';
import { ComponentsInjector } from '../../core';

describe(`I18N — Boot`, () => {
  it(`invoke i18next.init with config`, async () => {
    const originalFunction = i18next.init;
    const fakeI18NextInitFunction = jest.fn().mockImplementation((_, callback) => callback());
    (i18next as any).init = fakeI18NextInitFunction;
    const defaultConfig = createDefaultConfig();

    await boot(defaultConfig);

    expect(fakeI18NextInitFunction.mock.calls[0][0]).toEqual(defaultConfig.i18n);

    (i18next as any).init = originalFunction;
  });

  it(`invoke i18next.init with callback`, async () => {
    const originalFunction = i18next.init;
    const fakeI18NextInitFunction = jest.fn().mockImplementation((_, callback) => callback());

    (i18next as any).init = fakeI18NextInitFunction;
    const defaultConfig = createDefaultConfig();

    await boot(defaultConfig);

    expect(typeof fakeI18NextInitFunction.mock.calls[0][1]).toBe('function');

    (i18next as any).init = originalFunction;
  });

  it(`returns translate function and i18next instance after boot`, async () => {
    const defaultConfig = createDefaultConfig();

    const { t, i18next } = await boot(defaultConfig);

    expect(t).toBeDefined();
    expect(i18next).toBeDefined();
  });

  it(`injects property 't' to all registered components`, async () => {
    const Component = () => {};
    const defaultConfig = createDefaultConfig();
    ComponentsInjector.addComponentToRegistry(Component);

    await boot(defaultConfig);

    expect(Component.prototype).toHaveProperty('t');
    expect(typeof Component.prototype.t).toBe('function');

    ComponentsInjector.registry = [];
  });

  xit(`uses tNamespaces property from component prototype to create translator`, async () => {
    const Component = () => {};
    Component.prototype.tNamespaces = ['a', 'b', 'c'];
    const defaultConfig = createDefaultConfig();
    ComponentsInjector.addComponentToRegistry(Component);
    const fakeCreateTranslator = jest.fn();
    const originalCreateTranslator = createTranslator;

    // createTranslator = fakeCreateTranslator;
    await boot(defaultConfig);

    expect(fakeCreateTranslator.mock.calls[0][0]).toEqual(Component.prototype.tNamespaces);

    ComponentsInjector.registry = [];
    // createTranslator = originalCreateTranslator;
  });
});
