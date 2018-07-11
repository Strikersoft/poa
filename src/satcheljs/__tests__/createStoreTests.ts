import getRootStore from '../getRootStore';
import createStore from '../createStore';
import { __resetGlobalContext } from '../globalContext';

describe('createStore', () => {
  it('creates a subtree under rootStore', () => {
    __resetGlobalContext();
    let initialState = { testProp: 'testValue' };

    let store = createStore('testStore', initialState)();

    expect(store).toEqual(initialState);
    expect(getRootStore().get('testStore')).toEqual(initialState);
  });
});
