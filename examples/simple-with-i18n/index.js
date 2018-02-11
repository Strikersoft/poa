// application bootstrap
import { boot } from '@poa/core';

// routes definitions
import { routes } from './routes';

// locales
import { en } from './locales/en';
import { uk } from './locales/uk';

boot({
  router: { routes },
  i18n: {
    lng: 'uk',
    resources: {
      en,
      uk
    }
  }
});
