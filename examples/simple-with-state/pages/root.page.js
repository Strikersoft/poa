// @ts-check

import React from 'react';
import { Component } from '@poa/core';

class RootPage extends React.Component {
  store;
  actions;

  render() {
    return (
      <React.Fragment>
        Hello {this.store.hello}
        <button onClick={() => this.actions.changeHello('poa!')}>Change greeting</button>
      </React.Fragment>
    );
  }
}

export default Component()(RootPage);
