import * as React from 'react';
import { RouterProvider, Outlet } from 'mobx-little-router-react';

export interface PoaAppProps {
  router: any;
}

export class PoaApp extends React.Component<PoaAppProps> {
  render() {
    return (
      <RouterProvider router={this.props.router}>
        <Outlet />
      </RouterProvider>
    );
  }
}
