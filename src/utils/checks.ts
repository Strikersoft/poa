import { warn } from './logger';

export function warnIf(check: boolean, message: string) {
  if (check) {
    warn(message);
  }
}
