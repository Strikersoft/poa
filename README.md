# Poa framework

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

## Gettings started

### Install

```bash
  yarn add react @poa/core
```

### Opinionated

Poa — opinionated React framework.

What DOES opinionated mean?

* Framework will not suit for every case
* It has unique vision on how things should work
* #0CJS
* We hame some opinions on how things should work ;)

Since it is framework, not library, it bundled with all needed stuff to create small, medium and large projects.

### Getting started

We assumed that you are using some of official [starter kits](https://reactjs.org/community/starter-kits.html) (it should work with custom setup also).

TLDR; [https://codesandbox.io/s/yzzqk57lx](https://codesandbox.io/s/yzzqk57lx)

#### Basics

Initialize the Poa:

```js
// index.js

import { boot } from '@poa/core';

boot();
```

It should open dummy Poa screen.

#### Adding some routes

Let's add React component first;

```js
// src/pages/home.page.js

import React from 'react';
import { Component } from '@poa/core';

class HomePage extends React.Component {
  render() {
    return <p>Heelo!</p>;
  }
}

export default Component(/* additional config */)(HomePage);
```

Then let's declare our routing!

```js
// src/routes.js

import HomePage from './pages/home.page';

export const routes = [
  {
    path: '',
    redirectTo: '/home'
  },
  {
    path: '/home',
    component: HomePage
  }
];
```

Note, that we are using `redirectTo` functionality from mobx-little-route. (TODO: describe the Poa routing API)

The last thing, add your routes to Poa boot

```js
import { boot } from '@poa/core';
import { routes } from './routes';

boot({ router: { routes } });
```

Okay. Now on screen you will see you `HomePage` component and `/home` route;

#### Add localization

Let's define our locales first

```js
// src/locales/en.js

export const en = {
  helloScreen: {
    helloMessage: 'Jumbo jumbo!'
  }
};
```

Then let's update our component

```js
// src/pages/home.page.js

import React from 'react';
import { Component } from '@poa/core';

class HomePage extends React.Component {
  t; // injected by Poa

  render() {
    return <p>{this.t('helloMessage')}</p>;
  }
}

export default Component({ namespaces: ['homeScreen'] })(HomePage);
```

Notice that we using `this.t(...)`. Poa gently inject translation function to your components if you use enhancer `Component(config)(ReactComponent)`

Also, we pass `namespaces` in the `Component({ namespaces: ['homeScreen'] })(HomePage)` poa component enhancer.

After this, pass localization into i18n config.

```js
// src/index.js

import { boot } from '@poa/core';
import { routes } from './routes';

import { en } from './locales/en';

boot({
  router: { routes },
  i18n: { lng: 'en', resources: { en } }
});
```

Notice, that in i18n you can pass any additional config that is supported by [i18next](https://www.i18next.com). We just wrap it API (TODO: describe the Poa internationalization API)

#### Add state managment

Let's add moar complexity.
Add initial state of your application.

```js
// src/stores/hello.state.js

export const initialState = {
  dunnoState: false
};
```

Add some actions!

```js
// src/stores/hello.actions.js

import { createAction, addMutator, addSideEffects } from '@poa/state';

// action that can be dispatched with just functino invoking
export const dunnoAction = createAction('dunno', newValue => ({ newValue }));

// the only place where data can be changed
addMutator(dunnoAction, (payload, { store }) => {
  store.dunnoState = payload.newValue;
});

// any side-effects
addSideEffects(dunnoAction, async (payload, { store }) => {
  console.log('new store', store);
});
```

Add actions to our component

```js
import React from 'react';
import { Component } from '@poa/core';

class HomePage extends React.Component {
  t; // injected by Poa
  store; // injected by Poa
  actions; // injected by Poa

  handleClick = () => {
    this.actions.dunnoAction(true);
  };

  render() {
    return (
      <p>
        {this.t('helloMessage')}
        <br />
        {this.store.dunnoState ? 'Poa!' : null}
        <button onClick={this.handleClick}>Do jumbo!</button>
      </p>
    );
  }
}

export default Component({ namespaces: ['homeScreen'] })(HomePage);
```

Notice that `store` and `actions` are injected gently by Poa.

And the last step, update our boot configuration!

```js
import { boot } from '@poa/core';

import { routes } from './routes';
import { en } from './locales/en';

import { initialState } from './store/hello.state';
import * as actions from './store/hello.actions';

boot({
    // routing configuration
    router: { routes },

    // localization configuration
    i18n: {
      lng: 'en',
      resources: { en }
    },

    // state managment configuration
    state: {
      initial: initialState,
      actions: actions
    }
  });
}
```

Now, when you click on "Do jumbo!" it should dispatch the action, than this action will go throught mutator and after that, side affects are triggered. After that your component will re-render automatically!

In Poa we use custom version of satcheljs. But for core principles you can check (https://github.com/Microsoft/satcheljs)[https://github.com/Microsoft/satcheljs]

// TODO: describe Poa internal state management

### DI

You can pass additional `env` can, and it will be injected to your components and side effects

```js
// src/index.js
import { boot } from '@poa/core';

import { routes } from './routes';
import { en } from './locales/en';

import { initialState } from './store/hello.state';
import * as actions from './store/hello.actions';

boot({
    router: { routes },
    i18n: {
      lng: 'en',
      resources: { en }
    },
    state: {
      initial: initialState,
      actions: actions
    },

    // environment confugiration
    env: {
      http: fetch.bind(window)
    }
  });
}
```

So now, you can do the following

```js
// src/stores/hello.actions.js

import { createAction, addMutator, addSideEffects } from '@poa/state';

export const dunnoAction = createAction('dunno', newValue => ({ newValue }));

addMutator(dunnoAction, (payload, { store }) => {
  store.dunnoState = payload.newValue;
});

addSideEffects(dunnoAction, async (payload, { store, env }) => {
  // here is your injected env!
  await env.http('/users');
});
```

### Notice on actions injection in addSideEffects

If you need to invoke another actions from sideEffects (you definetly need it), they are injected!

```js
// src/stores/hello.actions.js

import { createAction, addMutator, addSideEffects } from '@poa/state';

export const dunnoAction = createAction('dunno', newValue => ({ newValue }));

export const dunnoActionSuccess = createAction('dunnoSuccess', () => ({}));

addMutator(dunnoAction, (payload, { store }) => {
  store.dunnoState = payload.newValue;
});

addSideEffects(dunnoAction, async (payload, { store, env, actions }) => {
  await env.http('/users');

  // here is your actions!
  actions.dunnoActionSuccess();
});
```

This is needed, when you need to access your actions from another module to avoid circular imports.

### Notice on async actions

To avoid doing like

```js
addSideEffects(dunnoAction, async (payload, { store, env, actions }) => {
  try {
    // start action sets isLoading=true
    actions.dunnoActionStart();

    // fetch data
    await env.http('/users');

    // success action sets isLoadgin=false
    actions.dunnoActionSuccess();
  } catch (e) {
    // failed action isLoadgin=false isError=true
    actions.dunnoActionFailed();
  }
});
```

You can `await` on action! We make sure that all side affects are resolved.

```js
...
async handleClick() {
  this.setState({ isLoading: true });
  this.actions.dunnoAction();
  this.setState({ isLoading: false });
}
...
```

### Documentation website

Under construction.

### Tech used that to make it possible

Runtime:

* react
* react-dom
* mobx
* mobx-react
* mobx-little-router
* mobx-little-router-react
* satcheljs
* i18next

Build:

* lerna
* microbundle
* parcel

Code:

* prettier

### TODO

* [ ] i18next .use()
* [ ] export all mobx stuff
* [ ] HTTP Client

Future:

* [ ] CLI for project setup / create boilerplate code
* [ ] Isomorphic support
* [ ] React Native support

```

```
