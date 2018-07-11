import { ComponentsInjector } from '../repository';

describe('CORE — Repository', () => {
  it('adds component to repository', () => {
    function Component() {}
    const fakeRegistry: Function[] = [];
    ComponentsInjector.registry = fakeRegistry;

    ComponentsInjector.addComponentToRegistry(Component);

    expect(fakeRegistry).toContain(Component);
    expect(fakeRegistry).toHaveLength(1);

    ComponentsInjector.registry = [];
  });

  it('adds ability to loop throught all added components', () => {
    function Component1() {}
    function Component2() {}

    ComponentsInjector.addComponentToRegistry(Component1);
    ComponentsInjector.addComponentToRegistry(Component2);

    ComponentsInjector.injectPropertyToAllComponents(component => {
      component.prototype.testProp = 0;
    });

    expect(Component1.prototype).toHaveProperty('testProp');
    expect(Component2.prototype).toHaveProperty('testProp');

    ComponentsInjector.registry = [];
  });
});
