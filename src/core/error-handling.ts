import * as Raven from 'raven-js';
import { RavenOptions } from 'raven-js';

import { getStore } from '../state/globals';
import { getLastAction } from '../state/middlewares/last-action.middleware';
import { log } from '../utils/logger';

export function captureException(exception: Error | ErrorEvent | string, options?: RavenOptions) {
  if (process.env.NODE_ENV !== 'development') {
    return Raven.captureException(exception, {
      extra: { state: { store: getStore(), lastAction: getLastAction() } },
      ...options
    });
  }

  log('Following exception will be tracked in production.');
  console.error(exception);
}
