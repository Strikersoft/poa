import ActionMessage from './ActionMessage';
declare type OrchestratorFunction<T extends ActionMessage> = (actionMessage: T) => void | Promise<any>;
export default OrchestratorFunction;
