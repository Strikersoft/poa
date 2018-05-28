import { observer } from 'mobx-react';
import { addComponentToRegistry } from './repository';
import { PoaComponentConfig } from './interfaces/component-config.interface';

export function Component(config: PoaComponentConfig) {
  return function PoaComponent(constructor: any) {
    addComponentToRegistry(constructor);

    if (config && config.namespaces) {
      constructor.prototype.tNamespaces = config.namespaces;
    }

    return observer(constructor);
  };
}
