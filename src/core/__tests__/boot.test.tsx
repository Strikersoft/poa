import { boot } from '../boot';

describe('CORE — Booting', () => {
  it(`boots without config`, async () => {
    const div = document.createElement('div');

    await boot({ react: { htmlNode: div } });
  });
});
