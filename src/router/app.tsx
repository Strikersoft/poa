import * as React from 'react';
import { RouterContext, Outlet } from 'mobx-little-router-react';
import { PoaComponent } from '../core';
import { RavenStatic } from 'raven-js';
import { getLastAction } from '../state/middlewares/last-action.middleware';

export interface PoaAppProps {
  router: any;
}

class PoaApp extends React.Component<PoaAppProps> {
  localState = {
    isFatalError: false
  };

  env: any;
  store: any;

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(error, errorInfo);

    if (process.env.NODE_ENV === 'production' && this.env.raven) {
      (this.env.raven as RavenStatic).captureException(error, {
        extra: { errorInfo, state: { store: this.store, lastAction: getLastAction() } }
      });
    }

    this.localState.isFatalError = true;
  }

  render() {
    if (this.localState.isFatalError) {
      // TODO: allow to render custom error component
      // TODO: provide a way to reboot poa app
      return <div>Fatal error occured</div>;
    }

    return (
      <RouterContext.Provider value={this.props.router}>
        <Outlet />
      </RouterContext.Provider>
    );
  }
}

export default PoaComponent()(PoaApp);
