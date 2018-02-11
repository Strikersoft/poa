// @ts-check

import i18next from 'i18next';

/**
 * @private
 * @param {*} config
 * @param {*} componentsInjector
 */
export function boot(config, componentsInjector) {
  return new Promise((resolve, reject) => {
    i18next.init(config, (error, t) => {
      if (error) {
        return reject(error);
      }

      componentsInjector(component => {
        component.prototype.t = translatorFuncCreator(component.prototype.tNamespaces || [], t);
      });

      return resolve({ t, i18next });
    });
  });
}

export const i18n = i18next;

const translatorFuncCreator = (dicts = [], t) => (value, opts) => {
  return t(value, { ns: [...dicts], opts });
};
