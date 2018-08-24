import { TranslationFunction } from 'i18next';
import PoaAppState from '../core/global-state';
import { warnIf } from '../utils/checks';
import { noop } from '../utils/globals';

let globalTranslatorFunction: TranslationFunction = noop;

export function setCurrentTranslatorFunction(t: TranslationFunction): void {
  globalTranslatorFunction = t;
}

export function getCurrentTranslatorFunction(): TranslationFunction {
  warnIf(PoaAppState.booted === false, 'You are using `t` function before Poa finished booting.');

  return globalTranslatorFunction;
}
