import ActionMessage from './interfaces/ActionMessage';
import ActionCreator from './interfaces/ActionCreator';
import { dispatch } from './dispatcher';
import createActionId from './createActionId';

export function actionCreator<
  T extends ActionMessage = {},
  TActionCreator extends ActionCreator<T> = () => T
>(actionType: string, target?: TActionCreator): TActionCreator {
  return createActionCreator(actionType, false, target);
}

export function action<
  T extends ActionMessage = {},
  TActionCreator extends ActionCreator<T> = () => T
>(actionType: string, target?: TActionCreator): TActionCreator {
  return createActionCreator(actionType, true, target);
}

export function asyncAction<
  T extends ActionMessage = {},
  TActionCreator extends ActionCreator<T> = () => T
>(actionType: string, target?: TActionCreator): TActionCreator {
  return createActionCreator(actionType, true, target, true);
}

function asyncDispatch(actionMessage: ActionMessage) {
  return Promise.resolve().then(() => dispatch(actionMessage));
}

function createActionCreator<T extends ActionMessage, TActionCreator extends ActionCreator<T>>(
  actionType: string,
  shouldDispatch: boolean,
  target?: TActionCreator,
  async?: boolean
): TActionCreator {
  let actionId = createActionId();

  let decoratedTarget = function createAction(...args: any[]) {
    // Create the action message
    let actionMessage: ActionMessage = target ? target.apply(null, args) : {};

    // Stamp the action type
    if (actionMessage.type) {
      throw new Error('Action creators should not include the type property.');
    }

    // Stamp the action message with the type and the private ID
    actionMessage.type = actionType;
    setPrivateActionId(actionMessage, actionId);

    if (shouldDispatch && async) {
      return asyncDispatch(actionMessage);
    }

    // Dispatch if necessary
    if (shouldDispatch) {
      dispatch(actionMessage);
    }

    return actionMessage;
  } as TActionCreator;

  // Stamp the action creator function with the private ID
  setPrivateActionId(decoratedTarget, actionId);
  return decoratedTarget;
}

export function getPrivateActionId(target: any) {
  return target.__SATCHELJS_ACTION_ID;
}

function setPrivateActionId(target: any, actionId: string) {
  target.__SATCHELJS_ACTION_ID = actionId;
}
