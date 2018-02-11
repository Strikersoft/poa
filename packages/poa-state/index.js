// @ts-check

import { applyMiddleware } from '@poa/satcheljs';
import { getRouter } from '@poa/router';

import { setEnv, setActions, getActions, getMiddlewares, getStore, getEnv } from './globals';
import { createInitialStore, createAction } from './wrappers';

// Pre-built actions
export const initAction = createAction('@@INIT', () => ({}));

/**
 * @private
 * @param {*} config
 * @param {*} componentsInjector
 */
export async function boot(config, componentsInjector) {
  // initialize store
  createInitialStore(config.state.initial);

  // save actions
  setActions(config.state.actions);

  // save environment
  setEnv(config.env);

  // inject store, actions and environment to all registered components
  componentsInjector(component => {
    component.prototype.store = getStore();
    component.prototype.actions = getActions();
    component.prototype.env = getEnv();
    component.prototype.router = getRouter();
  });

  // apply middlewares
  getMiddlewares().forEach(middleware => applyMiddleware(middleware(getStore())));

  await initAction();
}
