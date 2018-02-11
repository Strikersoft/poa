// @ts-check

import { observer } from 'mobx-react';
import { addComponentToRegistry } from './repository';

export function Component(config) {
  return function PoaComponent(constructor) {
    addComponentToRegistry(constructor);

    if (config && config.namespaces) {
      constructor.prototype.tNamespaces = config.namespaces;
    }

    return observer(constructor);
  };
}
