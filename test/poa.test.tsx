import * as React from 'react';
import { boot, Route } from '../src/poa';
import {
  Component,
  Link,
  createAction,
  addMutator,
  addSideEffects,
  PoaRouteResolveStratery
} from '../src/poa';
import * as ReactDOM from 'react-dom';
import { getStore } from '../src/state-lib/state';

// TODO: introduce Poa test mode with globals reset for Route, Component and unmounting

beforeAll(() => {
  (global as any).requestAnimationFrame = function(callback) {
    setTimeout(callback, 0);
  };
});

describe('boot() method', () => {
  it('boots poa correctly', async () => {
    await boot({
      react: { htmlNode: document.createElement('div') },
      router: { memoryRouter: true }
    });
  });
});

describe('Route() decorator', () => {
  it('creates route it renders', async () => {
    Route({ path: '/' })(() => <div>/</div>);

    const htmlNode = document.createElement('div');

    await boot({
      react: { htmlNode },
      router: { memoryRouter: true, memoryRouterProps: { initialEntries: ['/'] } }
    });
    expect(htmlNode.textContent).toBe('/');
  });

  // loading() {
  //   return 'swag';
  // },
  // error() {
  //   return 'error';
  // }

  it('triggers async onActivate hook', async () => {
    Route({
      path: '/route/onActive',
      async onActivate() {
        return true;
      }
    })(() => <div>/</div>);

    const htmlNode = document.createElement('div');

    await boot({
      react: { htmlNode },
      router: { memoryRouter: true, memoryRouterProps: { initialEntries: ['/route/onActive'] } }
    });
    expect(htmlNode.textContent).toBe('/');
  });

  it('triggers loading tempalte with onActivate hook', async () => {
    Route({
      path: '/route/onActiveWithLoading',
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

    const htmlNode = document.createElement('div');

    await boot({
      react: { htmlNode },
      router: {
        memoryRouter: true,
        memoryRouterProps: { initialEntries: ['/route/onActiveWithLoading'] }
      }
    });
    expect(htmlNode.textContent).toBe('swag');
  });

  it('triggers error template with onActivate hook', async () => {
    Route({
      path: '/route/onActiveWithError',
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

    const htmlNode = document.createElement('div');

    await boot({
      react: { htmlNode },
      router: {
        memoryRouter: true,
        memoryRouterProps: { initialEntries: ['/route/onActiveWithError'] }
      }
    });
    expect(htmlNode.textContent).toBe('error');
  });

  it('expect resolveStrategy mode nonwait', async () => {
    Route({
      path: '/route/nonwait',
      resolveStrategy: PoaRouteResolveStratery.nonwait
    })(() => <div>/</div>);

    const htmlNode = document.createElement('div');

    await boot({
      react: { htmlNode },
      router: { memoryRouter: true, memoryRouterProps: { initialEntries: ['/route/nonwait'] } }
    });
    expect(htmlNode.textContent).toBe('/');
  });

  it('renders correct link', async () => {
    Route({ path: '/link' })(() => <Link to="/" />);

    const htmlNode = document.createElement('div');

    await boot({
      react: { htmlNode },
      router: { memoryRouter: true, memoryRouterProps: { initialEntries: ['/link'] } }
    });

    expect(htmlNode.textContent).toBe('');
    expect(htmlNode.getElementsByTagName('a')[0].tagName).toBe('A');
  });

  it('warn on incorrect link', async () => {
    process.env.NODE_ENV = 'development';
    Route({ path: '/link1' })(() => <Link to="/123" />);

    const htmlNode = document.createElement('div');

    await boot({
      react: { htmlNode },
      router: { memoryRouter: true, memoryRouterProps: { initialEntries: ['/link1'] } }
    });

    expect(htmlNode.textContent).toBe('');
    expect(htmlNode.getElementsByTagName('a')[0].tagName).toBe('A');
    process.env.NODE_ENV = 'production';
  });
});

describe('Component() decorator', () => {
  it('creates component and it renders', async () => {
    const htmlNode = document.createElement('div');
    const TestComponent = Component()(() => <div>component</div>);
    Route({ path: '/component' })(() => <TestComponent />);

    await boot({
      react: { htmlNode },
      router: { memoryRouter: true, memoryRouterProps: { initialEntries: ['/component'] } }
    });
    expect(htmlNode.textContent).toBe('component');
  });
});

describe('State managment', () => {
  it('creates correct initial state and inject store', async () => {
    const htmlNode = document.createElement('div');
    const initialState = { a: 1 };
    const TestComponent = Component()(
      class TestComponent extends React.Component {
        store: typeof initialState;
        render() {
          return <div>{this.store.a}</div>;
        }
      }
    );

    Route({ path: '/store' })(() => <TestComponent />);

    await boot({
      react: { htmlNode },
      router: { memoryRouter: true, memoryRouterProps: { initialEntries: ['/store'] } },
      state: {
        initial: initialState,
        actions: {}
      }
    });
    expect(htmlNode.textContent).toBe(initialState.a.toString());
  });
  it('updates component on mutations', async () => {
    const htmlNode = document.createElement('div');
    const initialState = { a: 1 };
    const action1 = createAction('change_a', (a: number) => ({ a }));

    addMutator(action1, (payload, store: typeof initialState) => {
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

    Route({ path: '/store1' })(() => <TestComponent />);

    await boot({
      react: { htmlNode },
      router: { memoryRouter: true, memoryRouterProps: { initialEntries: ['/store1'] } },
      state: {
        initial: initialState,
        actions: {}
      }
    });

    action1(2);
    expect(getStore().a).toBe(2);
  });
  it('triggers side effects', done => {
    const htmlNode = document.createElement('div');
    const initialState = { a: 1 };
    const action1 = createAction('change_b', (a: number) => ({ a }));

    addMutator(action1, (payload, store: typeof initialState) => {
      store.a = payload.a;
    });

    addSideEffects(action1, () => {
      done();
    });

    const TestComponent = Component()(
      class TestComponent extends React.Component {
        store: typeof initialState;
        render() {
          return <div>{this.store.a}</div>;
        }
      }
    );

    Route({ path: '/store2' })(() => <TestComponent />);

    boot({
      react: { htmlNode },
      router: { memoryRouter: true, memoryRouterProps: { initialEntries: ['/store2'] } },
      state: {
        initial: initialState,
        actions: {}
      }
    });

    action1(2);
  });
});
