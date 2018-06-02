import * as i18next from 'i18next';
import { PoaAppConfig, ComponentsInjector } from '@poa/core';

export function boot(
  config: PoaAppConfig,
  componentsInjector: ComponentsInjector
): Promise<{ t: i18next.TranslationFunction; i18next: i18next.i18n }> {
  return new Promise((resolve, reject) => {
    i18next.init(config.i18n || ({} as i18next.InitOptions), (error, t) => {
      if (error) {
        return reject(error);
      }

      ComponentsInjector.injectPropertyToAllComponents((component: any) => {
        component.prototype.t = createTranslator(component.prototype.tNamespaces, t);
      });

      return resolve({ t, i18next });
    });
  });
}

function createTranslator(dicts = [], t: i18next.TranslationFunction) {
  function translator(value: string | string[], opts: i18next.TranslationOptions) {
    return t(value, { ns: [...dicts], opts });
  }

  return translator;
}
