import * as React from 'react';
import { boot, PoaRouterType } from '@poa/core';

class MyOwnRootComponent extends React.Component<{ poa: any }> {
  render() {
    return <div>I just hacked on poa! {this.props.poa}</div>;
  }
}

boot({
  react: { htmlNode: document.getElementById('root') },
  router: {
    type: PoaRouterType.Browser,
    routes: [
      {
        path: '',
        component: () => <div>Hello from poa + typescript!</div>
      }
    ]
  },
  hooks: {
    async configureAppInstance({ poaAppInstance }) {
      return <MyOwnRootComponent poa={poaAppInstance} />;
    },
    async configureI18Next({ i18next, t }) {
      // configure i18next!
      // like: i18next.use(Cache), etc...
      return;
    }
  }
});
