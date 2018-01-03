import * as React from 'react';
const MLRR = require('mobx-little-router-react');

import { reactDomPromisify } from './utils/react-dom-wrapper';
import { Component } from './component';
import { logger } from './logger-lib/logger';
import { bootRouter, Router, Route, Navigation } from './router-lib/router';
import { bootstrapLocalization, Translator, i18n } from './i18next-lib/i18next';
import {
  bootstrapState,
  createAction,
  addMutator,
  addSideEffects,
  initAction,
  resetStateGlobals,
  addMiddleware,
  getStore
} from './state-lib/state';
import { PoaBootConfig, RouterType } from './poa.interfaces';

const log = logger.get('poa-bootstrap');

class PoaApp extends React.Component<{ config: PoaBootConfig; router: Router }> {
  componentDidCatch(error: any, info: any) {
    log.error(error, info);
  }

  render() {
    return (
      <MLRR.RouterProvider router={this.props.router}>
        <MLRR.Outlet />
      </MLRR.RouterProvider>
    );
  }
}

export async function boot(config: PoaBootConfig) {
  if (config.react && config.react.loadingComponent) {
    await reactDomPromisify(<config.react.loadingComponent />, config.react.htmlNode);
  }

  const { router } = await bootRouter(config);

  await bootstrapLocalization(config.i18n || {});

  if (config.state) {
    // initialize with user defined state
    await bootstrapState(config.state.initial, config.state.actions, config.env);
  } else {
    // initialize with default state
    await bootstrapState({}, [], config.env);
  }

  await reactDomPromisify(
    <PoaApp config={config} router={router} />,

    // mount to user htmlNode or default node
    config.react ? config.react.htmlNode : document.getElementById('root')
  );
}

// TODO: use correct state interface not on demand
export async function testBoot(
  state?: { initial: any; actions: any },
  htmlNode = document.createElement('div'),
  loading?: any,
  routes: any[] = []
) {
  await boot({
    react: { htmlNode, loadingComponent: loading },
    router: { type: RouterType.memory, routes },
    state
  });

  return htmlNode;
}

// poa
export { Component, addMiddleware, createAction, addMutator, addSideEffects, initAction };

// i18n
export { i18n, Translator };

export function resetPoaGlobals() {
  resetStateGlobals();
}

// Mobx
import {
  observable,
  computed as mobxComputed,
  action,
  when,
  autorun,
  autorunAsync,
  IComputedValue
} from 'mobx';
import { observer, Observer } from 'mobx-react';

export const computed = (fn: Function) => mobxComputed(() => fn({ store: getStore() }));

export { observable, action, when, autorun, autorunAsync, IComputedValue, observer, Observer };

// router
import { Link } from './router-lib/link';

export const Outlet: any = MLRR.Outlet;

export { RouterType, Link, Route, Navigation };
