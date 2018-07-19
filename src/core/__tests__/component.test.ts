import * as React from 'react';
import { PoaComponent } from '../component';
import { isObservableObject } from '../../state/mobx';

describe(`CORE — Component`, () => {
  it(`works without providing config`, () => {
    class TestComponent extends React.Component {}

    PoaComponent()(TestComponent);

    const component = new TestComponent({}, {});

    expect(TestComponent.prototype).not.toHaveProperty('tNamepspaces');
    expect(isObservableObject((component as any).localState)).not.toBeTruthy();
  });

  it(`injects 'tNamespaces' property into component`, () => {
    class TestComponent extends React.Component {}
    const tNamespaces = ['a', 'b', 'c'];

    PoaComponent({ namespaces: tNamespaces })(TestComponent);

    expect(TestComponent.prototype).toHaveProperty('tNamespaces');
    expect((TestComponent.prototype as any).tNamespaces).toBe(tNamespaces);
  });

  it(`wraps 'localState' property into observable`, () => {
    class TestComponent extends React.Component {
      localState = { test: 'value ' };
    }

    PoaComponent()(TestComponent);
    const component = new TestComponent({}, {});

    expect(isObservableObject(component.localState)).toBeTruthy();
  });
});
