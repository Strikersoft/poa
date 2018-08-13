import DispatchFunction from '../../satcheljs/interfaces/DispatchFunction';

let lastAction: any;

export async function lastActionMiddleware(next: DispatchFunction, action: any) {
  lastAction = action;
  next(action);
}

export function getLastAction() {
  return lastAction || null;
}
