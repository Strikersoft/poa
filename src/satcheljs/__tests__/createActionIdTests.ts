import createActionId from '../createActionId';
import { __resetGlobalContext } from '../globalContext';

describe('createActionId', () => {
  it('returns the next incremental ID for each call', () => {
    __resetGlobalContext();

    expect(createActionId()).toBe('0');
    expect(createActionId()).toBe('1');
    expect(createActionId()).toBe('2');
  });
});
