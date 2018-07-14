import getRootStore from '../getRootStore';
import createStore from '../createStore';
import { __resetGlobalContext } from '../globalContext';

describe('createStore', () => {
  it('creates a subtree under rootStore', () => {
    __resetGlobalContext();
    const initialState = { testProp: 'testValue' };

    const store = createStore('testStore', initialState)();

    expect(store).toEqual(initialState);
    expect(getRootStore().get('testStore')).toEqual(initialState);
  });
});
