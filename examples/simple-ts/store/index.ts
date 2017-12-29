import { actions } from './actions';
import { initialState } from './store';

export type Store = typeof initialState;
export type Actions = typeof actions;

export type MutationOpts = { store: Store };
export type SideEffectOpts = { store: Store; actions: Actions };
