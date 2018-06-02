import ActionMessage from './ActionMessage';
declare type DispatchFunction = (actionMessage: ActionMessage) => void | Promise<void>;
export default DispatchFunction;
