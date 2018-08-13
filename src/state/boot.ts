import { setEnv, setActions, getActions, getMiddlewares, getStore, getEnv } from './globals';
import { createInitialStore } from './wrappers';
import { applyMiddleware, configureMobx } from '../satcheljs';
import { initAction } from './buildin-actions';
import { PoaAppConfig } from '../core';
import { ComponentsInjector } from '../core/repository';
import { lastActionMiddleware } from './middlewares/last-action.middleware';

/**
 * @private
 * @param {*} config
 */
export async function boot(config: PoaAppConfig) {
  // TODO: rethink not strict mode
  configureMobx(false);

  // initialize store
  const store = createInitialStore(config.state.initial);

  // save actions
  const actions = setActions(config.state.actions);

  // save environment
  const env = setEnv(config.env);

  // inject store, actions and environment to all registered components
  ComponentsInjector.injectPropertyToAllComponents((component: any) => {
    component.prototype.store = getStore();
    component.prototype.actions = getActions();
    component.prototype.env = getEnv();
  });

  // apply middlewares
  getMiddlewares().forEach((middleware: (store: any) => any) =>
    applyMiddleware(middleware(getStore()))
  );

  applyMiddleware(lastActionMiddleware);

  await initAction();

  return { store, actions, env };
}
