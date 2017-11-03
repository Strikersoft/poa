import createActionId from '../../src/state-lib/satchel/createActionId';
import { __resetGlobalContext } from '../../src/state-lib/satchel/globalContext';

describe('createActionId', () => {
  it('returns the next incremental ID for each call', () => {
    // Arrange
    __resetGlobalContext();

    // Act / Assert
    expect(createActionId()).toBe('0');
    expect(createActionId()).toBe('1');
    expect(createActionId()).toBe('2');
  });
});
