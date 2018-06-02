import SimpleAction from './interfaces/SimpleAction';
export declare function createSimpleSubscriber(decorator: Function): <T extends SimpleAction>(actionType: string, target: T) => T;
export declare const mutatorAction: <T extends SimpleAction>(actionType: string, target: T) => T;
export declare const orchestratorAction: <T extends SimpleAction>(actionType: string, target: T) => T;
