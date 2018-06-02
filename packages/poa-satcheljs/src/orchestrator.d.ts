import ActionCreator from './interfaces/ActionCreator';
import ActionMessage from './interfaces/ActionMessage';
import OrchestratorFunction from './interfaces/OrchestratorFunction';
export default function orchestrator<T extends ActionMessage>(actionCreator: ActionCreator<T>, target: OrchestratorFunction<T>): OrchestratorFunction<T>;
