// @ts-check

import ReactDOM from 'react-dom';

export function render(app, element) {
  return new Promise(resolve => ReactDOM.render(app, element, resolve));
}
