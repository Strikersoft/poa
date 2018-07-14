import { createInitialStore } from '../wrappers';
import { selector } from '../globals';

describe('STATE — Wrappers', () => {
  it('throw error when initial state have computed/selector', () => {
    function playground() {
      createInitialStore({
        test: selector(() => {})
      });
    }

    expect(playground).toThrowError();
  });
});
