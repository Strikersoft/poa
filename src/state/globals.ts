import { __resetGlobalContext } from '../satcheljs';
import { computed, IComputedValue } from 'mobx';
export { IComputedValue } from 'mobx';

let currentStore = {};
let currentEnvironment = {};
let currentActions = {};
let middlewares: any[] = [];

export function setEnv(newEnv: any) {
  currentEnvironment = newEnv;
  return getEnv();
}

export function getEnv() {
  return currentEnvironment;
}

export function setStore(newStore: any) {
  currentStore = newStore;
}

export function getStore() {
  return currentStore;
}

export function setActions(newActions: any) {
  currentActions = newActions;
  return getActions();
}

export function getActions() {
  return currentActions;
}

export function addMiddleware(...mds: any[]) {
  middlewares.push(...mds);
}

export function getMiddlewares() {
  return middlewares;
}

export function selector(fn: (store: any) => any): IComputedValue<any> {
  return computed(() => fn(getStore()));
}

export function resetGlobals() {
  setActions({});
  setStore({});
  setEnv({});

  middlewares = [];
  __resetGlobalContext();
}
