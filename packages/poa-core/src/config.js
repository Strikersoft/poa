// @ts-check
import React from 'react';

function helloComponent() {
  return <div>Jambo, jambo! Define your routes in {`boot({ routes: <here> })`}.</div>;
}

export function createDefaultConfig(config) {
  const defaultConfig = {
    react: { htmlNode: document.getElementById('root'), loadingComponent: null },
    router: {
      type: 'browser',
      routes: [
        {
          path: '',
          component: helloComponent
        }
      ]
    },
    state: {
      initial: {},
      actions: {}
    },
    env: {}
  };

  return Object.assign({}, defaultConfig, config);
}
