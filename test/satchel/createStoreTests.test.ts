import getRootStore from '../../src/state-lib/satchel/getRootStore';
import createStore from '../../src/state-lib/satchel/createStore';
import { __resetGlobalContext } from '../../src/state-lib/satchel/globalContext';

describe('createStore', () => {
  it('creates a subtree under rootStore', () => {
    // Arrange
    __resetGlobalContext();
    let initialState = { testProp: 'testValue' };

    // Act
    let store = createStore('testStore', initialState)();

    // Assert
    expect(store).toBe(initialState);
    expect(getRootStore().get('testStore')).toBe(initialState);
  });
});
