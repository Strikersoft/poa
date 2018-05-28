import * as React from 'react';
import { boot, PoaRouterType } from '@poa/core';

boot({
  react: { htmlNode: document.getElementById('root') },
  router: {
    type: PoaRouterType.Browser,
    routes: [
      {
        path: '',
        component: () => <div>Hello typescript!</div>
      }
    ]
  }
});
