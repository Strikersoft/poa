import React from 'react';

export class Link extends React.Component<{ to: string }> {}

/**
 * @private
 */
export class PoaApp extends React.Component<{ router: any }> {}

/**
 * @private
 * @param config
 */
export function boot(config: any, injectionData: any): Promise<any>;

export function getRouter(): any;
