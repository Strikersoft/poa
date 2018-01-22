// @ts-check

import React from 'react';
import { RouterProvider, Outlet } from 'mobx-little-router-react';

/**
 * @augments {React.Component<{router: any}, {}>}
 */
export class PoaApp extends React.Component {
  render() {
    return (
      <RouterProvider router={this.props.router}>
        <Outlet />
      </RouterProvider>
    );
  }
}
