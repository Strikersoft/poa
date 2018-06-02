import { boot } from '../src/boot';

describe('Booting', () => {
  it('just boots without errors', async done => {
    try {
      await boot();
      done();
    } catch (e) {
      fail(e);
    }
  });
});
