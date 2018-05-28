const registry: string[] = [];

export function addComponentToRegistry(component: any) {
  registry.push(component);
}

export function injectPropertyToAllComponents(callback: any) {
  registry.forEach(callback);
}
