import { PoaAppConfig, ComponentsInjector } from '@poa/core';
export declare const initAction: () => {};
/**
 * @private
 * @param {*} config
 * @param {*} componentsInjector
 */
export declare function boot(config: PoaAppConfig, componentsInjector: ComponentsInjector): Promise<{
    store: {};
    actions: {};
    env: {};
}>;
