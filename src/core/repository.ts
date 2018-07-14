/**
 * Registry of all poa components
 * Allowed to inject some propoerty to components and add some components to registry
 *
 * @export
 * @class ComponentsInjector
 */
export class ComponentsInjector {
  static registry: Function[] = [];

  public static injectPropertyToAllComponents(
    callback: (value: Function, index: number, array: Function[]) => void
  ) {
    ComponentsInjector.registry.forEach(callback);
  }

  public static addComponentToRegistry(component: Function) {
    ComponentsInjector.registry.push(component);
  }
}
