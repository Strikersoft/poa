// @ts-check

import React from 'react';
import { Component } from '@poa/core';

class RootPage extends React.Component {
  t;

  render() {
    return <React.Fragment>{this.t('hello')}</React.Fragment>;
  }
}

export default Component({ namespaces: ['root'] })(RootPage);
