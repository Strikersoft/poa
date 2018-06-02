/// <reference types="react" />
import { Location } from 'history';
export interface LinkProps {
    to: string | Location;
    className?: string;
    activeClassName?: string;
    style?: Object;
    children?: any;
    exact?: boolean;
    target?: string;
    onClick: Function;
}
/**
 * Component that helps to navigate in your react
 * Example: <Link path="/new-home" />
 *
 * @export
 * @param {LinkProps} props
 * @returns
 */
export declare function Link(props: LinkProps): JSX.Element;
