import * as React from 'react';
import { Location } from 'history';
import { Link as MLRRLink } from 'mobx-little-router-react';

export interface LinkProps {
  to: string | Location;
  className?: string;
  activeClassName?: string;
  style?: Object;
  children?: any;
  exact?: boolean;
  target?: string;
  onClick?: Function;
}

/**
 * Component that helps to navigate in your react
 * Example: <Link path="/new-home" />
 *
 * @export
 * @param {LinkProps} props
 * @returns
 */
export function Link(props: LinkProps) {
  return <MLRRLink {...props} />;
}
