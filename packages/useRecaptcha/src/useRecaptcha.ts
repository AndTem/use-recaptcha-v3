import { useState } from 'react';
import useScript from 'react-script-hook';

import { generateScriptSrc } from './utils';

import {
  RecaptchaWindow,
  HookEntryParams,
  GetRecaptchaToken,
  ReadinessStatus,
  ReturnedHookValue,
} from './types';

const useRecaptcha = ({
  siteKey,
  lang,
}: HookEntryParams): ReturnedHookValue => {
  const [readinessStatus, setStatus] = useState<ReadinessStatus>({
    loading: true,
    ready: false,
    error: null,
  });

  const handleLoadScript = () => {
    (window as RecaptchaWindow).grecaptcha.ready(() => {
      setStatus({
        loading: false,
        ready: true,
        error: null,
      });
    });
  };

  const handleErrorScript = () => {
    setStatus({
      loading: false,
      ready: false,
      error: new Error('An error occurred while loading Recaptcha'),
    });
  };

  const getRecaptchaToken: GetRecaptchaToken = async (action: string) => {
    if (!readinessStatus.ready) {
      throw Error('executeRecaptcha was called before the script was loaded');
    }

    return Promise.resolve(
      (window as RecaptchaWindow).grecaptcha.execute(siteKey, { action })
    );
  };

  useScript({
    src: generateScriptSrc({ siteKey, lang }),
    onload: handleLoadScript,
    onerror: handleErrorScript,
  });

  return {
    readinessStatus,
    getRecaptchaToken,
  };
};

export default useRecaptcha;
