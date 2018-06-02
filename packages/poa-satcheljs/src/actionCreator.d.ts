import ActionMessage from './interfaces/ActionMessage';
import ActionCreator from './interfaces/ActionCreator';
export declare function actionCreator<T extends ActionMessage = {}, TActionCreator extends ActionCreator<T> = () => T>(actionType: string, target?: TActionCreator): TActionCreator;
export declare function action<T extends ActionMessage = {}, TActionCreator extends ActionCreator<T> = () => T>(actionType: string, target?: TActionCreator): TActionCreator;
export declare function asyncAction<T extends ActionMessage = {}, TActionCreator extends ActionCreator<T> = () => T>(actionType: string, target?: TActionCreator): TActionCreator;
export declare function getPrivateActionId(target: any): any;
