import * as React from 'react';
import { RouterContext, Outlet } from 'mobx-little-router-react';

export interface PoaAppProps {
  router: any;
}

export class PoaApp extends React.Component<PoaAppProps> {
  render() {
    return (
      <RouterContext.Provider value={this.props.router}>
        <Outlet />
      </RouterContext.Provider>
    );
  }
}
