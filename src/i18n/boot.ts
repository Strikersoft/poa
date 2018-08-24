import * as i18next from 'i18next';
import { ComponentsInjector } from '../core/repository';
import { PoaAppConfig } from '../core';
import { createTranslator } from './translator';
import { setCurrentTranslatorFunction } from './globals';

export interface PoaI18NextBootResult {
  t: i18next.TranslationFunction;
  i18next: i18next.i18n;
}

// export function t(value: string | string[], opts: i18next.TranslationOptions = {}) {
//   return currentT(value, opts);
// }

export function boot(config: PoaAppConfig): Promise<PoaI18NextBootResult> {
  return new Promise((resolve, reject) => {
    i18next.init(config.i18n, (error, t) => {
      if (error) {
        return reject(error);
      }

      ComponentsInjector.injectPropertyToAllComponents(component => {
        component.prototype.t = createTranslator(component.prototype.tNamespaces, t);
      });

      setCurrentTranslatorFunction(t);

      return resolve({ t, i18next });
    });
  });
}
