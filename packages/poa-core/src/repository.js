const registry = [];

/**
 * Add new component to registry
 * @private
 * @param {*} component
 */
export function addComponentToRegistry(component) {
  registry.push(component);
}

/**
 * Inject property to all components
 * @private
 * @param {*} callback
 */
export function injectPropertyToAllComponents(callback) {
  registry.forEach(callback);
}
