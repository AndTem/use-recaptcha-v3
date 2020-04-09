import { generateScriptSrc } from '../utils';

describe('generateScriptSrc', () => {
  it('generates basic recaptcha script src', () => {
    const params = {
      siteKey: 'site_key',
    };

    expect(generateScriptSrc(params)).toBe(
      'https://www.google.com/recaptcha/api.js?render=site_key'
    );
  });

  it('generates recaptcha script src with language tag', () => {
    const params = {
      siteKey: 'site_key',
      lang: 'ru',
    };

    expect(generateScriptSrc(params)).toBe(
      'https://www.google.com/recaptcha/api.js?render=site_key&hl=ru'
    );
  });
});
