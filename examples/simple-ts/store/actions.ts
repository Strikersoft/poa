import { createAction, addMutator, addSideEffects } from '../../../src/poa';
import { MutationOpts, SideEffectOpts } from './index';

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const changeHelloText = createAction('changeHelloText', (text: string) => ({ text }));

addMutator(changeHelloText, ({ text }, { store }: MutationOpts) => {
  store.helloText = text;
});

addSideEffects(changeHelloText, async ({ text }, { store, actions, router }: SideEffectOpts) => {
  await delay(1000);
  console.log('Log change from side-effect async', store.helloText);

  router.push('/about');
});

export const actions = { changeHelloText };
