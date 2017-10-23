import {
  createStore as satchelCreateStore,
  useStrict,
  mutator,
  action,
  orchestrator,
  ActionCreator,
  OrchestratorFunction,
  ActionMessage
} from 'satcheljs';
import { injectPropertyToAllComponents } from '../components-registry';
import { logger } from '../logger-lib/logger';

useStrict(false);

const log = logger.get('poa-state');

// tslint:disable-next-line:no-any
let store: any;
// tslint:disable-next-line:no-any
let environment: any = {};

export function createInitialStore<InitialState>(state: InitialState) {
  store = satchelCreateStore<InitialState>('poaStore', state)();
  return store;
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
// tslint:disable-next-line:no-any
export declare type PoaMutatorFunction<T extends ActionMessage> = (
  actionMessage: T,
  store: any
) => void;

export function addMutator<T extends ActionMessage>(
  actionCreator: ActionCreator<T>,
  target: PoaMutatorFunction<T>
): PoaMutatorFunction<T> {
  log.debug('added mutator for', actionCreator);
  // tslint:disable-next-line:no-any
  return mutator(actionCreator, (actionMessage: T) => {
    log.debug('executing mutator on', actionMessage);
    target(actionMessage, getStore());
  });
}

// tslint:disable-next-line:no-any
export let internalActions: any[];

function setActions(actions: typeof internalActions) {
  internalActions = actions;
}

function getActions() {
  return internalActions;
}

export function createAction<
  T extends ActionMessage = {},
  TActionCreator extends ActionCreator<T> = () => T
>(actionType: string, target?: TActionCreator): TActionCreator {
  return action(actionType, target);
}

export declare type PoaSideEffectFunction<T extends ActionMessage> = (
  actionMessage: T,
  // tslint:disable-next-line:no-any
  actions: any,
  // tslint:disable-next-line:no-any
  environment: any
) => void;

export function addSideEffects<T extends ActionMessage>(
  actionCreator: ActionCreator<T>,
  target: PoaSideEffectFunction<T>
): OrchestratorFunction<T> {
  return orchestrator(actionCreator, actionMessage => {
    log.debug('executing orchestrator on', actionMessage);
    return target(actionMessage, getActions(), getEnv());
  });
}

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
}
