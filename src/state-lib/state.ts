import {
  createStore as satchelCreateStore,
  useStrict,
  mutator,
  asyncAction,
  orchestrator,
  DispatchFunction,
  Middleware,
  applyMiddleware,
  ActionCreator,
  OrchestratorFunction,
  ActionMessage
} from './satchel';
import { History } from 'history';
import { injectPropertyToAllComponents } from '../components-registry';
import { logger } from '../logger-lib/logger';
import { getHistory } from '../router-lib/router';
import { __resetGlobalContext } from './satchel/globalContext';

useStrict(false);

const log = logger.get('poa-state');

// tslint:disable-next-line:no-any
let store: any;
// tslint:disable-next-line:no-any
let environment: any = {};

export function createInitialStore<InitialState>(state: InitialState) {
  setStore(satchelCreateStore<InitialState>('poaStore', state)());
  return getStore();
}

// tslint:disable-next-line:no-any
function setEnv(env: any) {
  environment = env;
}

function getEnv() {
  return environment;
}

export function getStore() {
  return store;
}

function setStore(s: typeof store) {
  store = s;
}

// tslint:disable-next-line:no-any
export declare type PoaMutatorFunction<T extends ActionMessage> = (
  actionMessage: T,
  opts: {
    store: any;
  }
) => void;

export function addMutator<T extends ActionMessage>(
  actionCreator: ActionCreator<T>,
  target: PoaMutatorFunction<T>
): PoaMutatorFunction<T> {
  // tslint:disable-next-line:no-any
  return mutator(actionCreator, (actionMessage: T) => {
    target(actionMessage, { store: getStore() });
  });
}

// tslint:disable-next-line:no-any
export let internalActions: any[];

function setActions(actions: typeof internalActions) {
  internalActions = actions;
}

export function getActions() {
  return internalActions;
}

export function createAction<
  T extends ActionMessage = {},
  TActionCreator extends ActionCreator<T> = () => T
>(actionType: string, target?: TActionCreator): TActionCreator {
  return asyncAction(actionType, target);
}

export interface PoaSideEffectOpts {
  actions: any;
  router: History;
  env: any;
  store: any;
}

export declare type PoaSideEffectFunction<T extends ActionMessage> = (
  actionMessage: T,
  opts: PoaSideEffectOpts
) => void;

export function addSideEffects<T extends ActionMessage>(
  actionCreator: ActionCreator<T>,
  target: PoaSideEffectFunction<T>
): OrchestratorFunction<T> {
  return orchestrator(actionCreator, actionMessage => {
    return target(actionMessage, {
      actions: getActions(),
      router: getHistory(),
      env: getEnv(),
      store: getStore()
    });
  });
}

export const initAction = createAction('@@INIT', () => ({}));
const middlewaresToAdd: PoaMiddleware[] = [];

// tslint:disable-next-line:no-any
export async function bootstrapState(initialState: {}, actions: typeof internalActions, env?: any) {
  if (env) {
    setEnv(env);
  }

  createInitialStore<{}>(initialState);
  setActions(actions);

  injectPropertyToAllComponents(component => {
    component.prototype.store = getStore();
    component.prototype.actions = getActions();
  });

  middlewaresToAdd.forEach(m => applyMiddleware(m(getStore())));

  await initAction();
}

export function resetStateGlobals() {
  setActions([]);
  setStore({});
  setEnv({});
  __resetGlobalContext();
}

export declare type PoaMiddleware = (store: any) => Middleware;

export function addMiddleware(...middlewares: PoaMiddleware[]) {
  middlewaresToAdd.push(...middlewares);
}
