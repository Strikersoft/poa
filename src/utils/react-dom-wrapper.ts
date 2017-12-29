import * as ReactDOM from 'react-dom';

export function reactDomPromisify(app: React.ReactElement<any>, element: HTMLElement | null) {
  return new Promise(resolve => ReactDOM.render(app, element, resolve));
}
