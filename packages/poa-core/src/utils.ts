import * as ReactDOM from 'react-dom';
import { PoaAppConfig } from './interfaces/app-config.interface';

export function render(app: any, element: HTMLElement | null) {
  return new Promise(resolve => ReactDOM.render(app, element, resolve));
}
