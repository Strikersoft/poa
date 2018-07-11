import { isObservableMap } from 'mobx';
import {
  __resetGlobalContext,
  getGlobalContext,
  ensureGlobalContextSchemaVersion
} from '../globalContext';

describe('globalContext', () => {
  beforeEach(() => {
    __resetGlobalContext();
  });

  it('will throw error if the wrong schema version is detected', () => {
    getGlobalContext().schemaVersion = -999;

    expect(ensureGlobalContextSchemaVersion).toThrow();
  });

  it('rootStore is an ObservableMap', () => {
    let rootStore = getGlobalContext().rootStore;

    expect(isObservableMap(rootStore)).toBeTruthy();
  });
});
