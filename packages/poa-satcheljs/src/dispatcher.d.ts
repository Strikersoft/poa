import ActionMessage from './interfaces/ActionMessage';
import Subscriber from './interfaces/Subscriber';
export declare function subscribe(actionId: string, callback: Subscriber<any>): void;
export declare function dispatch(actionMessage: ActionMessage): void | Promise<void>;
export declare function finalDispatch(actionMessage: ActionMessage): void | Promise<void>;
