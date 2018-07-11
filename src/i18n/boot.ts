import * as i18next from 'i18next';
import { PoaAppConfig, ComponentsInjector } from '../core';

export interface PoaI18NextBootResult {
  t: i18next.TranslationFunction;
  i18next: i18next.i18n;
}

export function boot(config: PoaAppConfig): Promise<PoaI18NextBootResult> {
  return new Promise((resolve, reject) => {
    i18next.init(config.i18n, (error, t) => {
      if (error) {
        return reject(error);
      }

      ComponentsInjector.injectPropertyToAllComponents(component => {
        component.prototype.t = createTranslator(component.prototype.tNamespaces, t);
      });

      return resolve({ t, i18next });
    });
  });
}

export function createTranslator(dicts = [], t: i18next.TranslationFunction) {
  function translator(value: string | string[], opts: i18next.TranslationOptions) {
    return t(value, { ns: [...dicts], opts });
  }

  return translator;
}
