/**
 * Registry of all poa components
 * Allowed to inject some propoerty to components and add some components to registry
 *
 * @export
 * @class ComponentsInjector
 */
export class ComponentsInjector {
  private static registry: any[] = [];

  public static injectPropertyToAllComponents(callback: any) {
    ComponentsInjector.registry.forEach(callback);
  }

  public static addComponentToRegistry(component: any) {
    ComponentsInjector.registry.push(component);
  }
}
