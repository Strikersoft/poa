import * as React from 'react';
import {
  boot,
  Route,
  resetPoaGlobals,
  Component,
  Link,
  createAction,
  addMutator,
  initAction,
  addSideEffects,
  testBoot,
  PoaRouteResolveStratery
} from '../src/poa';
import * as ReactDOM from 'react-dom';
import { getStore, addMiddleware } from '../src/state-lib/state';

(global as any).requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};

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

describe('Route() decorator', () => {
  it('creates route it renders', async () => {
    Route({ path: '/' })(() => <div>/</div>);

    const htmlNode = await testBoot();

    expect(htmlNode.textContent).toBe('/');
  });

  it('triggers async onActivate hook', async done => {
    Route({
      path: '/',
      async onActivate() {
        done();
        return true;
      }
    })(() => <div>/</div>);

    const htmlNode = await testBoot();

    expect(htmlNode.textContent).toBe('/');
  });

  it('pass actions into onActivate hook', async done => {
    Route({
      path: '/',
      async onActivate(actions) {
        done();
        expect(actions).toBeDefined();
        return true;
      }
    })(() => <div>/</div>);

    const htmlNode = await testBoot();
    expect(htmlNode.textContent).toBe('/');
  });

  it('triggers loading tempalte with onActivate hook', async () => {
    Route({
      path: '/',
      async onActivate() {
        function sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }

        await sleep(1);
        return true;
      },
      loading() {
        return 'swag';
      }
    })(() => <div>/</div>);

    const htmlNode = await testBoot();

    expect(htmlNode.textContent).toBe('swag');
  });

  it('triggers error template with onActivate hook', async () => {
    Route({
      path: '/',
      async onActivate() {
        throw new Error('a');
      },
      loading() {
        return 'swag';
      },
      error() {
        return 'error';
      }
    })(() => <div>/</div>);

    const htmlNode = await testBoot();
    expect(htmlNode.textContent).toBe('error');
  });

  it('expect resolveStrategy mode nonwait', async () => {
    Route({
      path: '/',
      resolveStrategy: PoaRouteResolveStratery.nonwait
    })(() => <div>/</div>);

    const htmlNode = await testBoot();
    expect(htmlNode.textContent).toBe('/');
  });

  it('renders correct link', async () => {
    Route({ path: '/' })(() => <Link to="/" />);

    const htmlNode = document.createElement('div');

    await boot({
      react: { htmlNode },
      router: { memoryRouter: true, memoryRouterProps: { initialEntries: ['/'] } }
    });

    expect(htmlNode.textContent).toBe('');
    expect(htmlNode.getElementsByTagName('a')[0].tagName).toBe('A');
  });

  it('warn on incorrect link', async () => {
    process.env.NODE_ENV = 'development';
    Route({ path: '/' })(() => <Link to="/123" />);

    const htmlNode = await testBoot();

    expect(htmlNode.textContent).toBe('');
    expect(htmlNode.getElementsByTagName('a')[0].tagName).toBe('A');
    process.env.NODE_ENV = 'production';
  });
});

describe('Component() decorator', () => {
  it('creates component and it renders', async () => {
    const TestComponent = Component()(() => <div>component</div>);
    Route({ path: '/' })(() => <TestComponent />);

    const htmlNode = await testBoot();
    expect(htmlNode.textContent).toBe('component');
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

    Route({ path: '/' })(() => <TestComponent />);

    const initialState = { a: 1 };
    const htmlNode = await testBoot({ initial: initialState, actions: {} });
    expect(htmlNode.textContent).toBe(initialState.a.toString());
  });

  it('updates component on mutations', async () => {
    const initialState = { a: 1 };
    const action1 = createAction('change_a', (a: number) => ({ a }));

    addMutator(action1, (payload, { store }: { store: typeof initialState }) => {
      store.a = payload.a;
    });

    const TestComponent = Component()(
      class TestComponent extends React.Component {
        store: typeof initialState;
        render() {
          return <div>{this.store.a}</div>;
        }
      }
    );

    Route({ path: '/' })(() => <TestComponent />);

    const htmlNode = await testBoot({ initial: initialState, actions: {} });

    action1(2);
    expect(getStore().a).toBe(2);
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

    Route({ path: '/' })(() => <Comp />);

    const htmlNode = await testBoot({ initial: initialState, actions: {} });

    action1(2);
  });

  it('dispatches init event on load', async done => {
    const initialState = { a: 1 };
    const TestComponent = Component()(
      class TestComponent extends React.Component {
        store: typeof initialState;
        render() {
          return <div>{this.store.a}</div>;
        }
      }
    );

    Route({ path: '/' })(() => <TestComponent />);

    addSideEffects(initAction, () => {
      done();
    });

    const htmlNode = await testBoot({ initial: initialState, actions: {} });

    expect(htmlNode.textContent).toBe(initialState.a.toString());
  });

  it('assigns middlewares', async done => {
    const initialState = { a: 1 };
    const TestComponent = Component()(
      class TestComponent extends React.Component {
        store: typeof initialState;
        render() {
          return <div>{this.store.a}</div>;
        }
      }
    );

    Route({ path: '/' })(() => <TestComponent />);

    addMiddleware(store => (next, action) => {
      expect(store).toEqual(initialState);
      done();
      next(action);
    });

    const htmlNode = await testBoot({ initial: initialState, actions: {} });

    expect(htmlNode.textContent).toBe(initialState.a.toString());
  });
});
