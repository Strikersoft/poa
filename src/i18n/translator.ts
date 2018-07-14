import { TranslationFunction, TranslationOptions } from 'i18next';

export function createTranslator(dicts = [], t: TranslationFunction) {
  function translator(value: string | string[], opts: TranslationOptions = {}) {
    return t(value, { ns: [...dicts], ...opts });
  }

  return translator;
}
