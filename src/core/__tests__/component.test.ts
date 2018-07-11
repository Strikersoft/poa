import { Component } from '../component';
import { PoaComponentConfig } from '../interfaces/component-config.interface';
import { ComponentsInjector } from '../repository';

describe('CORE — Component decorator (HOC)', () => {
  it(`works without providing config`, () => {
    function componentToWrap() {}

    const result = Component()(componentToWrap);

    expect(result).toBeTruthy();
  });

  it(`wraps into observer`, () => {
    function componentToWrap() {}

    const result = Component()(componentToWrap);

    expect(result.isMobXReactObserver).toBeTruthy();
  });

  it(`inject 'tNamespaces' into component prototype`, () => {
    const namespacedToBeInjected = ['a', 'b', 'c'];
    const config: PoaComponentConfig = {
      namespaces: namespacedToBeInjected
    };
    function componentToWrap() {}

    Component(config)(componentToWrap);

    expect(componentToWrap.prototype.tNamespaces).toEqual(namespacedToBeInjected);
  });

  it(`does not inject 'tNamespaces' into component prototype without config`, () => {
    function componentToWrap() {}

    Component()(componentToWrap);

    expect(componentToWrap.prototype.tNamespaces).toEqual(undefined);
  });

  it(`adds component to registry`, () => {
    function componentToWrap() {}
    ComponentsInjector.addComponentToRegistry = jest.fn().mockImplementationOnce(() => {});

    Component()(componentToWrap);

    expect(ComponentsInjector.addComponentToRegistry).toBeCalled();
  });
});
