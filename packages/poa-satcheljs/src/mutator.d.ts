import ActionCreator from './interfaces/ActionCreator';
import ActionMessage from './interfaces/ActionMessage';
import MutatorFunction from './interfaces/MutatorFunction';
export default function mutator<T extends ActionMessage>(actionCreator: ActionCreator<T>, target: MutatorFunction<T>): MutatorFunction<T>;
