export * from 'mobx';
export * from 'mobx-react';

declare type componentsInjector = (component) => void;

export function addMiddleware(...middlewares: any[]);

export function selector(fn: any);

export const initAction: any;

/**
 * @private
 */
export function boot(
  config: any,
  componentsInjector: componentsInjector
): Promise<{ store: any; actions: any; env: any }>;

/*
 * createAction
 */
interface ActionMessage {
  type?: string;
  [key: string]: any;
}

type ActionCreator<T extends ActionMessage> = (...args: any[]) => T;

export function createAction<
  T extends ActionMessage = {},
  TActionCreator extends ActionCreator<T> = () => T
>(actionType: string, target: ActionCreator<T>): TActionCreator;

/*
 * addMutator
 */
export declare type PoaMutatorFunction<T extends ActionMessage> = (
  actionMessage: T,
  opts: {
    store: any;
  }
) => void;

export function addMutator<T extends ActionMessage>(
  actionCreator: ActionCreator<T>,
  target: PoaMutatorFunction<T>
): PoaMutatorFunction<T>;

/*
 * addSideEffects
 */
type OrchestratorFunction<T extends ActionMessage> = (actionMessage: T) => void | Promise<any>;

export interface PoaSideEffectOpts {
  actions: any;
  env: any;
  store: any;
  router: any;
}

export declare type PoaSideEffectFunction<T extends ActionMessage> = (
  actionMessage: T,
  opts: PoaSideEffectOpts
) => void;

export function addSideEffects<T extends ActionMessage>(
  actionCreator: ActionCreator<T>,
  target: PoaSideEffectFunction<T>
): OrchestratorFunction<T>;
