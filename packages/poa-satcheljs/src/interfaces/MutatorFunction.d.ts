import ActionMessage from './ActionMessage';
declare type MutatorFunction<T extends ActionMessage> = (actionMessage: T) => void;
export default MutatorFunction;
