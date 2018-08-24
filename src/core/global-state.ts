import { observable, action } from '../state/mobx';
import { setCurrentTranslatorFunction } from '../i18n/globals';
import { noop } from '../utils/globals';
import { resetGlobals } from '../state/globals';

class PoaAppState {
  @observable booted = false;
  @observable dev = false;

  @action
  markAsBooted() {
    this.booted = true;
  }

  @action
  markAsDevMode() {
    this.dev = true;
  }

  @action
  reset() {
    // reset core state
    this.booted = false;
    this.dev = false;

    // reset i18n state
    setCurrentTranslatorFunction(noop);

    // reset state
    resetGlobals();
  }
}

export default new PoaAppState();
