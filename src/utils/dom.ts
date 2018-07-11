import * as ReactDOM from 'react-dom';

export function render(app: any, element: HTMLElement | null) {
  return new Promise(resolve => ReactDOM.render(app, element, resolve));
}
