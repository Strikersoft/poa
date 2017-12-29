import * as React from 'react';
import {
  boot,
  resetPoaGlobals,
  Component,
  createAction,
  addMutator,
  initAction,
  addSideEffects,
  testBoot,
  Link
} from '../src/poa';
import * as ReactDOM from 'react-dom';
import { getStore, addMiddleware } from '../src/state-lib/state';
import { autorun } from 'mobx';

beforeEach(() => {
  resetPoaGlobals();
});

describe('boot() method', () => {
  it('boots poa correctly', async () => {
    await testBoot();
  });

  it('shows loading on boot', async done => {
    const htmlNode = document.createElement('div');

    addSideEffects(initAction, async () => {
      expect(htmlNode.textContent).toEqual('loading');
      done();
    });

    await testBoot({ initial: {}, actions: {} }, htmlNode, () => <div>loading</div>);
  });
});

describe('Component() decorator', () => {
  it('creates component and it renders', async () => {
    const TestComponent = Component()(() => <div>component</div>);

    const htmlNode = await testBoot();
    ReactDOM.render(<TestComponent />, htmlNode);

    expect(htmlNode.textContent).toEqual('component');
  });
});

describe('State managment', () => {
  it('creates correct initial state and inject store', async () => {
    const TestComponent = Component()(
      class extends React.Component {
        store: typeof initialState;
        render() {
          return <div>{this.store.a}</div>;
        }
      }
    );

    const initialState = { a: 1 };
    const htmlNode = await testBoot({ initial: initialState, actions: {} });

    ReactDOM.render(<TestComponent />, htmlNode);

    expect(htmlNode.textContent).toEqual(initialState.a.toString());
  });

  it('possible to create actino without payload', async () => {
    const initialState = { a: 1 };
    const action1 = createAction('change_a');

    addMutator(action1, (payload, { store }: { store: typeof initialState }) => {
      store.a = 2;
    });

    const htmlNode = await testBoot({ initial: initialState, actions: {} });

    action1();
    expect(getStore().a).toEqual(2);
  });

  it('updates component on mutations', async () => {
    const initialState = { a: 1 };
    const action1 = createAction('change_a', (a: number) => ({ a }));

    addMutator(action1, (payload, { store }: { store: typeof initialState }) => {
      store.a = payload.a;
    });

    const htmlNode = await testBoot({ initial: initialState, actions: {} });

    action1(2);
    expect(getStore().a).toEqual(2);
  });

  it('triggers side effects', async done => {
    const initialState = { a: 1 };
    const action1 = createAction('change_b', (a: number) => ({ a }));

    addMutator(action1, (payload, { store }) => {
      store.a = payload.a;
    });

    addSideEffects(action1, () => {
      done();
    });

    class TestComponent extends React.Component {
      store: typeof initialState;
      render() {
        return <div>{this.store.a}</div>;
      }
    }

    const Comp = Component()(TestComponent);

    const htmlNode = await testBoot({ initial: initialState, actions: {} });

    action1(2);
  });

  it('dispatches init event on load', async done => {
    const initialState = { a: 1 };
    addSideEffects(initAction, () => {
      done();
    });

    const htmlNode = await testBoot({ initial: initialState, actions: {} });
  });

  it('assigns middlewares', async done => {
    const initialState = { a: 1 };

    addMiddleware(store => (next, action) => {
      expect(store).toEqual(initialState);
      done();
      next(action);
    });

    await testBoot({ initial: initialState, actions: {} });
  });
});

describe('Router', () => {
  it('Renders Link component', async () => {
    class Route extends React.Component {
      render() {
        return <Link to="/about">thelink</Link>;
      }
    }

    const htmlNode = await testBoot({ initial: {}, actions: {} }, undefined, undefined, [
      { path: '', component: Route }
    ]);

    expect(htmlNode.textContent).toEqual('thelink');
  });
});
