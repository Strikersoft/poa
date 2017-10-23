import * as ReactDOM from 'react-dom';

export function reactDomPromisify(app: React.ReactElement<{}>, element: HTMLElement) {
  return new Promise(resolve => ReactDOM.render(app, element, () => resolve()));
}
