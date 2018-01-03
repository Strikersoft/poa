import * as React from 'react';
const { Link: MobxRouterLink } = require('mobx-little-router-react');

export function Link(props: any) {
  return <MobxRouterLink {...props} />;
}
