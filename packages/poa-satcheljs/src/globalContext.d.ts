import { ObservableMap } from 'mobx';
import ActionMessage from './interfaces/ActionMessage';
import DispatchFunction from './interfaces/DispatchFunction';
import Subscriber from './interfaces/Subscriber';
export interface GlobalContext {
    schemaVersion: number;
    rootStore: ObservableMap<any>;
    nextActionId: number;
    subscriptions: {
        [key: string]: Subscriber<ActionMessage>[];
    };
    dispatchWithMiddleware: DispatchFunction | null;
    inMutator: boolean;
}
export declare function __resetGlobalContext(): void;
export declare function ensureGlobalContextSchemaVersion(): void;
export declare function getGlobalContext(): GlobalContext;
