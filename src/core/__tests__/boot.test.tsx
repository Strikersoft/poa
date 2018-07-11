import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { boot } from '../boot';

describe('CORE — Booting', () => {
  it(`boots without config`, async () => {
    const div = document.createElement('div');

    await boot({ react: { htmlNode: div } });
  });
});
