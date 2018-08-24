import { boot } from '../boot';
import { PoaRouterType } from '../interfaces/app-config.interface';

describe('CORE — Booting', () => {
  it(`boots`, async done => {
    const div = document.createElement('div');

    try {
      await boot({
        react: { htmlNode: div },
        router: { type: PoaRouterType.Memory, routes: [{ path: '' }] }
      });
      done();
    } catch (e) {
      fail(e);
    }
  });
});
