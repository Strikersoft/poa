// @ts-check

import { setStore, getStore, getActions, getEnv } from './globals';
import { createStore, asyncAction, mutator, orchestrator } from '@poa/satcheljs';
import { getRouter } from '@poa/router';

/**
 * Used to initialize SatchelJS store, and save at as global
 * @private
 * @param {*} state
 */
export function createInitialStore(state) {
  setStore(createStore('poaStore', state)());
  return getStore();
}

/**
 * Creates new action in systems
 * @public
 * @param {*} actionType
 * @param {*} target
 */
export function createAction(actionType, target) {
  return asyncAction(actionType, target);
}

/**
 * Add mutation to action
 * @public
 * @param {*} actionCreator
 * @param {*} target
 */
export function addMutator(actionCreator, target) {
  return mutator(actionCreator, actionMessage => {
    target(actionMessage, { store: getStore() });
  });
}

/**
 * Add side effects to action
 * @public
 * @param {*} actionCreator
 * @param {*} target
 */
export function addSideEffects(actionCreator, target) {
  return orchestrator(actionCreator, actionMessage => {
    return target(actionMessage, {
      actions: getActions(),
      env: getEnv(),
      store: getStore(),
      router: getRouter()
    });
  });
}
