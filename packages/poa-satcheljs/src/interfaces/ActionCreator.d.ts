import ActionMessage from './ActionMessage';
declare type ActionCreator<T extends ActionMessage> = (...args: any[]) => T;
export default ActionCreator;
