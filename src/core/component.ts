import { observer, IReactComponent } from '../state/mobx-react';
import { ComponentsInjector } from './repository';
import { PoaComponentConfig } from './interfaces/component-config.interface';
import { decorate, observable } from '../state/mobx';

export function PoaComponent(config?: PoaComponentConfig) {
  return function InternalPoaComponent<T extends IReactComponent>(component: T): T {
    ComponentsInjector.addComponentToRegistry(component);

    if (config && config.namespaces) {
      component.prototype.tNamespaces = config.namespaces;
    }

    decorate(component as any, {
      localState: observable
    });

    return observer(component);
  };
}
