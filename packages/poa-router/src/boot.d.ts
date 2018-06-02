import { PoaAppConfig, ComponentsInjector } from '@poa/core';
import { MemoryHistory, History } from 'history';
export { History, MemoryHistory } from 'history';
export declare function getRouter(): any;
export declare function boot(config: PoaAppConfig, injectionData: any, componentsInjector: ComponentsInjector): Promise<{
    router: any;
    history: History | MemoryHistory;
}>;
export declare function startRouter(router: any): Promise<{}>;
