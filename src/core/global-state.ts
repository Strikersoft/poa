import { observable, action } from '../state/mobx';

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
}

export default new PoaAppState();
