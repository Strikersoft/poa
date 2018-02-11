import { useStrict } from 'mobx';

// Current API
export { action, actionCreator, asyncAction } from './actionCreator';
export { default as applyMiddleware } from './applyMiddleware';
export { default as createStore } from './createStore';
export { dispatch } from './dispatcher';
export { default as mutator } from './mutator';
export { default as orchestrator } from './orchestrator';
export { default as getRootStore } from './getRootStore';
export { mutatorAction, orchestratorAction } from './simpleSubscribers';
export { useStrict };

// Default to MobX strict mode
useStrict(true);
