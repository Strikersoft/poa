import { TranslationFunction, TranslationOptions } from 'i18next';
import { getCurrentTranslatorFunction } from './globals';

export function createTranslator(dicts = [], t: TranslationFunction) {
  function translator(value: string | string[], opts: TranslationOptions = {}) {
    return t(value, { ns: [...dicts], ...opts });
  }

  return translator;
}

export function t(value: string | string[], opts: TranslationOptions = {}) {
  return getCurrentTranslatorFunction()(value, opts);
}

export { TranslationFunction };
