import { History } from 'history';
import { PoaI18nOpts } from './i18next-lib/i18next';

export interface PoaBootConfig {
  react: { htmlNode: HTMLElement; loadingComponent?: any };
  router: {
    hashRouter?: boolean;
    memoryRouter?: boolean;
    memoryRouterProps?: {
      initialEntries?: History.LocationDescriptor[];
      initialIndex?: number;
      getUserConfirmation?: (() => void);
      keyLength?: number;
    };
    initialRoute?: string;
  };
  i18n?: PoaI18nOpts;
  // TODO: add typing for state
  // tslint:disable-next-line:no-any
  state?: { initial: {}; actions: any };
  // tslint:disable-next-line:no-any
  env?: any;
}
