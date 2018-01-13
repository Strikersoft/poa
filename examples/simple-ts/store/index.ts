import { actions } from './actions';
import { initialState } from './store';
import { Router } from '../../../src/poa';

export type Store = typeof initialState;
export type Actions = typeof actions;

export type MutationOpts = { store: Store };
export type SideEffectOpts = { store: Store; actions: Actions; router: Router };
export type RouterHookOpts = { store: Store; actions: Actions };
