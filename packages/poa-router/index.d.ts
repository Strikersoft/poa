import React from 'react';

declare type componentsInjector = (component) => void;

export class Link extends React.Component<{ to: string }> {}

/**
 * @private
 */
export class PoaApp extends React.Component<{ router: any }> {}

/**
 * @private
 * @param config
 */
export function boot(
  config: any,
  injectionData: any,
  injectPropertyToAllComponent: componentsInjector
): Promise<any>;

export function getRouter(): any;
