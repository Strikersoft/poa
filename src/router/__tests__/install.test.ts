import { installRouter, createRouterInstallConfig, MobxLittleRouterConfig } from '../install';
import { createDefaultConfig } from '../../core/config';
import { install } from 'mobx-little-router-react';

jest.mock('mobx-little-router-react');

describe('installRouter', () => {
  it('calls install function from mobx-little-router-react', () => {
    const poaDefaultConfig = createDefaultConfig();
    const config: MobxLittleRouterConfig = createRouterInstallConfig(poaDefaultConfig);

    installRouter(config);

    expect(install).toBeCalledWith(config);
  });
});
