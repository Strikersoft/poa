// application bootstrap
import { boot } from '@poa/core';

// state managment
import { createAction, addMutator, addSideEffects } from '@poa/state';

// routes definitions
import { routes } from './routes';

// state
const initialState = { hello: 'world' };

// actions
const changeHello = createAction('changeHello', newHello => ({ newHello }));
const promptToRedirect = createAction('promptToRedirect', () => ({}));

// mutators
addMutator(changeHello, (payload, { store }) => {
  store.hello = payload.newHello;
});

addMutator(promptToRedirect, (_, { store }) => {
  store.hello = 'You will be redirected to new route in 5 seconds';
});

// side effects
addSideEffects(changeHello, (payload, { store, router, actions }) => {
  setTimeout(() => actions.promptToRedirect(), 2000);
});

addSideEffects(promptToRedirect, (_, { router }) => {
  setTimeout(() => router.push('/new-route'), 5000);
});

boot({
  router: { routes },
  state: {
    initial: { hello: 'world' },
    actions: {
      changeHello,
      promptToRedirect
    }
  }
});
