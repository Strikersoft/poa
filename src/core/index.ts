// Main
// boot the application
export { boot } from './boot';
// decorate components
export { PoaComponent } from './component';
// capture expections
export { captureException } from './error-handling';

// Types
// re-export main interfaces
export { PoaRouterType, PoaRoutesConfig, PoaAppConfig } from './interfaces/app-config.interface';
export { TranslationFunction } from '../i18n/translator';
export { PoaRouter } from './interfaces/router.interface';
