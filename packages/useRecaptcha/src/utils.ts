import { HookEntryParams } from './types';

const generateScriptSrc = ({
  siteKey,
  lang,
}: Pick<HookEntryParams, 'siteKey' | 'lang'>): string => {
  let baseSrc = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;

  if (lang) {
    baseSrc = `${baseSrc}&hl=${lang}`;
  }

  return baseSrc;
};

export { generateScriptSrc };
