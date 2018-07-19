import { installRouter, createRouterInstallConfig, MobxLittleRouterConfig } from '../install';
import { createDefaultConfig } from '../../core/config';
import * as mobxlittlerouterreact from 'mobx-little-router-react';

describe('installRouter', () => {
  it('calls install function from mobx-little-router-react', () => {
    const poaDefaultConfig = createDefaultConfig();
    const injectedData = {};
    const config: MobxLittleRouterConfig = createRouterInstallConfig(
      poaDefaultConfig,
      injectedData
    );

    spyOn(mobxlittlerouterreact, 'install');

    installRouter(config);

    expect(mobxlittlerouterreact.install).toBeCalledWith(config);
  });
});