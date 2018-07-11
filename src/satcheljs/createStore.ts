import { action } from 'mobx';
import getRootStore from './getRootStore';

let createStoreAction = action('createStore', function createStoreAction(
  key: string,
  initialState: any
) {
  getRootStore().set(key, initialState);
});

export default function createStore<T>(key: string, initialState: T): () => T {
  createStoreAction(key, initialState);
  // tslint:disable-next-line:no-angle-bracket-type-assertion
  return () => <T>getRootStore().get(key);
}
