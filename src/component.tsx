import { observer } from 'mobx-react';
import { addComponentToRegistry } from './components-registry';

export interface PoaComponentDecorator {
  namespaces?: string[];
}

export function Component(config?: PoaComponentDecorator) {
  // tslint:disable-next-line:no-any
  return function PoaComponent(constructor: any) {
    addComponentToRegistry(constructor);

    if (config && config.namespaces) {
      constructor.prototype.tNamespaces = config.namespaces;
    }

    // tslint:disable-next-line:no-any
    return observer(constructor) as any;
  };
}
