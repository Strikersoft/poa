import { observer, IReactComponent } from '../state/mobx-react';
import { ComponentsInjector } from './repository';
import { PoaComponentConfig } from './interfaces/component-config.interface';

export function PoaComponent(config?: PoaComponentConfig) {
  return function InternalPoaComponent<T extends IReactComponent>(component: T): T {
    ComponentsInjector.addComponentToRegistry(component);

    if (config && config.namespaces) {
      component.prototype.tNamespaces = config.namespaces;
    }

    return observer(component);
  };
}
