import { LocationDescriptor, LocationDescriptorObject } from 'history';

export interface PoaRouter {
  go: (href: any) => any;
  goBack: () => any;
  push: (href: any) => any;
  replace: (href: any) => any;
  createHref: (href: any) => any;

  getNode: (key: any) => any;
  getParam: (key: any, paramName: any) => any;
  getParams: (key: any) => any;
  getRoute: (key: any) => any;
  resolvePath: (path: any) => any;
  select: (body: any) => any;
  start: (callback: any) => any;
  stop: () => any;
  subscribeEvent: (f: any) => any;
  updateQuery: (query: any) => any;

  location: LocationDescriptorObject;
}
