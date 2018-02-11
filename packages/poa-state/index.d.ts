declare type componentsInjector = (component) => void;

/**
 * @private
 * @param config
 * @param componentsInjector
 */
export async function boot(config: any, componentsInjector: componentsInjector);
