import { boot, RouterType } from '../../src/poa';

// routes
import { routes } from './routes';

// locales
import { en } from './locales/en';
import { uk } from './locales/uk';

// state
import { initialState } from './store/store';
import { actions } from './store/actions';

boot({
  router: {
    type: RouterType.hash,
    routes
  },
  state: {
    initial: initialState,
    actions
  },
  i18n: {
    lng: 'en',
    resources: { en, uk }
  }
});
