# Poa framework

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

## Gettings started

### Install

```bash
  yarn add react @poa/core
```

We do not rely on React internally, so you need to install `react` to start creating views.

### Opinionated

Poa — opinionated React framework.

By word "opinionated" means that it has opinions on how:

* you structure project files
* you structure routing
* you manage state
* you localize application

Since it is framework, not library, it bundled with all needed stuff to create small, medium and large projects.

### Documentation

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
