import * as React from 'react';
import { Link as RRLink, LinkProps } from 'react-router-dom';
import { logger } from '../logger-lib/logger';
import { userRoutes } from './router';

const log = logger.get('poa-router');

export interface PoaLinkProps extends LinkProps {}

export function Link(props: PoaLinkProps) {
  if (process.env.NODE_ENV === 'development') {
    const routePath = props.to.toString().startsWith('/') ? props.to : `/${props.to}`;

    if (!userRoutes.find(route => route.path === routePath)) {
      log.warn(
        `Link to=${props.to} does not exist in path's: ${userRoutes.map(r => r.path).join(', ')}`
      );
    }
  }

  return <RRLink {...props} />;
}
