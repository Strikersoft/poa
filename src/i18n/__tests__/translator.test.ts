import { boot, PoaRouterType } from '../../core';
import { t } from '../';
import * as i18next from 'i18next';
import * as logger from '../../utils/logger';

describe('Static translator (t function)', () => {
  let i18nTranslationSpy: jest.SpyInstance;
  let warnLogSpy: jest.SpyInstance;

  beforeEach(() => {
    i18nTranslationSpy = jest.spyOn(i18next, 't');
    warnLogSpy = jest.spyOn(logger, 'warn');
  });

  afterEach(() => {
    i18nTranslationSpy.mockReset();
    warnLogSpy.mockReset();
  });

  it('uses i18n.t after poa boot', async () => {
    await boot({
      react: { htmlNode: document.createElement('div') },
      router: { type: PoaRouterType.Memory, routes: [{ path: '' }] }
    });

    t('test');

    expect(i18nTranslationSpy).toBeCalled();
  });

  it('uses noop if poa is not booted', () => {
    t('test');

    expect(warnLogSpy).toBeCalled();
    expect(i18nTranslationSpy).not.toBeCalled();
  });
});
