import * as React from 'react';
import { Link as RRLink, LinkProps, NavLinkProps, NavLink as RRNavLink } from 'react-router-dom';
import { logger } from '../logger-lib/logger';
import { userRoutes } from './router';

const log = logger.get('poa-router');

export interface PoaLinkProps extends LinkProps {}
export interface PoaNavLinkProps extends LinkProps {}

function checkIfRouteExistOrWarn(props: PoaLinkProps | PoaNavLinkProps) {
  const routePath = props.to.toString().startsWith('/') ? props.to : `/${props.to}`;

  if (!userRoutes.find(route => route.path === routePath)) {
    log.warn(
      `Link to=${props.to} does not exist in path's: ${userRoutes.map(r => r.path).join(', ')}`
    );
  }
}

export function Link(props: PoaLinkProps) {
  if (process.env.NODE_ENV === 'development') {
    checkIfRouteExistOrWarn(props);
  }

  return <RRLink {...props} />;
}

export function NavLink(props: PoaNavLinkProps) {
  if (process.env.NODE_ENV === 'development') {
    checkIfRouteExistOrWarn(props);
  }

  return <RRNavLink {...props} />;
}
