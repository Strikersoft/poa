import { map, ObservableMap } from 'mobx';
import ActionMessage from './interfaces/ActionMessage';
import DispatchFunction from './interfaces/DispatchFunction';
import Subscriber from './interfaces/Subscriber';

const schemaVersion = 3;

// Interfaces for Global Context
export interface GlobalContext {
  schemaVersion: number;
  rootStore: ObservableMap<any>;
  nextActionId: number;
  subscriptions: { [key: string]: Subscriber<ActionMessage>[] };
  dispatchWithMiddleware: DispatchFunction | null;
  inMutator: boolean;
}

declare var global: {
  __poaSatchelGlobalContext: GlobalContext;
};

// A reset global context function to be used INTERNALLY by SatchelJS tests and for initialization ONLY
export function __resetGlobalContext() {
  global.__poaSatchelGlobalContext = {
    schemaVersion: schemaVersion,
    rootStore: map({}),
    nextActionId: 0,
    subscriptions: {},
    dispatchWithMiddleware: null,
    inMutator: false
  };
}

export function ensureGlobalContextSchemaVersion() {
  if (schemaVersion !== global.__poaSatchelGlobalContext.schemaVersion) {
    throw new Error('Detected incompatible SatchelJS versions loaded.');
  }
}

export function getGlobalContext() {
  return global.__poaSatchelGlobalContext;
}

// Side Effects: actually initialize the global context if it is undefined
if (!global.__poaSatchelGlobalContext) {
  __resetGlobalContext();
} else {
  ensureGlobalContextSchemaVersion();
}
