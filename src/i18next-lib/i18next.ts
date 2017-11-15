import * as i18next from 'i18next';
import { injectPropertyToAllComponents } from '../components-registry';
import { logger } from '../logger-lib/logger';

const log = logger.get('poa-i18n');

export interface PoaI18nOpts extends i18next.InitOptions {
  // TODO: display loading placeholder when i18next options has async loading
  // tslint:disable-next-line:no-any
  loadingPlaceholder?: React.ReactElement<any>;
}
export interface Translator extends i18next.TranslationFunction {}

export function bootstrapLocalization(config: i18next.InitOptions) {
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line:no-any
    (i18next as any).default.init(config, (error: any, t: i18next.TranslationFunction) => {
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
