import ActionMessage from 'poa-satcheljs/src/interfaces/ActionMessage';
import ActionCreator from 'poa-satcheljs/src/interfaces/ActionCreator';
import MutatorFunction from 'poa-satcheljs/src/interfaces/MutatorFunction';
import OrchestratorFunction from 'poa-satcheljs/src/interfaces/OrchestratorFunction';
export declare function createInitialStore(state: any): {};
export declare function createAction<T extends ActionMessage = {}, TActionCreator extends ActionCreator<T> = () => T>(actionType: string, target?: TActionCreator): TActionCreator;
export declare type PoaMutatorFunction<T extends ActionMessage> = (actionMessage: T, config: {
    store: any;
}) => void;
export declare function addMutator<T extends ActionMessage>(actionCreator: ActionCreator<T>, target: PoaMutatorFunction<T>): MutatorFunction<T>;
export declare type PoaOrchestratorFunction<T extends ActionMessage> = (actionMessage: T, config: {
    actions: any;
    env: any;
    store: any;
    router: any;
}) => void | Promise<any>;
export declare function addSideEffects<T extends ActionMessage>(actionCreator: ActionCreator<T>, target: PoaOrchestratorFunction<T>): OrchestratorFunction<T>;
