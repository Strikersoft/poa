import ActionMessage from './ActionMessage';
import DispatchFunction from './DispatchFunction';
declare type Middleware = (next: DispatchFunction, actionMessage: ActionMessage) => void;
export default Middleware;
