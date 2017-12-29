import { ObservableMap } from 'mobx';
import { getGlobalContext } from './globalContext';

/**
 * Satchel-provided root store getter
 */
export default function getRootStore() {
  return getGlobalContext().rootStore;
}
