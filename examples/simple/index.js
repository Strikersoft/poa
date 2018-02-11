// application bootstrap
import { boot } from '@poa/core';

// routes definitions
import { routes } from './routes';

boot({
  router: { routes }
});
