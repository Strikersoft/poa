// tslint:disable-next-line:no-any
export const registry: any[] = [];

// tslint:disable-next-line:no-any
export function addComponentToRegistry(component: any) {
  registry.push(component);
}

// tslint:disable-next-line:no-any
export function injectPropertyToAllComponents(callback: (component: any) => void) {
  registry.forEach(callback);
}
