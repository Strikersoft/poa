import i18next from 'i18next';
import { TranslationFunction, InitOptions } from 'i18next';
import { injectPropertyToAllComponents } from '../components-registry';
import { logger } from '../logger-lib/logger';

const log = logger.get('poa-i18n');

export interface PoaI18nOpts extends InitOptions {
  // TODO: display loading placeholder when i18next options has async loading
  // tslint:disable-next-line:no-any
  loadingPlaceholder?: React.ReactElement<any>;
}
export interface Translator extends TranslationFunction {}

export function bootstrapLocalization(config: InitOptions) {
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line:no-any
    i18next.init(config, (error: any, t: TranslationFunction) => {
      if (error) {
        return reject(error);
      }

      injectPropertyToAllComponents(component => {
        component.prototype.t = translatorFuncCreator(component.prototype.tNamespaces || [], t);
      });

      return resolve(t);
    });
  });
}

export const i18n = i18next;

// tslint:disable-next-line:no-any
export const translatorFuncCreator = (dicts: string[], t: any) => (value: string, opts?: {}) => {
  return t(value, { ns: [...dicts], ...opts });
};
