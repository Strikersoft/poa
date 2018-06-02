/// <reference types="react" />
export interface OutletProps {
    name?: string;
}
/**
 * Outlet component is responsible for rendering the matched components
 * from RouterStore into it. Each Outlet element renders it's current node index
 * in the path, and then provides the next index to subsequent Outlet components.
 *
 * <div>
 *  <Outlet name="main" />
 *  <Outlet name="sidebar" />
 * </div>
 *
 * @export
 * @param {OutletProps} props
 * @returns
 */
export declare function Outlet(props: OutletProps): JSX.Element;
