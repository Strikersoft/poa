import * as i18next from 'i18next';
import { PoaAppConfig, ComponentsInjector } from '@poa/core';
export declare function boot(config: PoaAppConfig, componentsInjector: ComponentsInjector): Promise<{
    t: i18next.TranslationFunction;
    i18next: i18next.i18n;
}>;
