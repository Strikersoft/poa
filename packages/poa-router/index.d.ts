import React from 'react';

export class Link extends React.Component {}

/**
 * @private
 */
export class PoaApp extends React.Component<{ router: any }> {}

/**
 * @private
 * @param config
 */
export function boot(config: any): Promise<any>;

export function getRouter(): any;
