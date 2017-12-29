import * as React from 'react';
import { Link as MobxRouterLink } from 'mobx-little-router-react';

export function Link(props: any) {
  return <MobxRouterLink {...props} />;
}
