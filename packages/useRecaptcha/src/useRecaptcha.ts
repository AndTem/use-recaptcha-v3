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
  const [status, setStatus] = useState<ReadinessStatus>({
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

  const getRecaptchaToken: GetRecaptchaToken = (action: string) =>
    new Promise((resolve, reject) => {
      if (!status.ready) {
        reject(Error('Recaptcha script not yet loaded'));
      }

      (window as RecaptchaWindow).grecaptcha
        .execute(siteKey, { action })
        .then(resolve, (error) => {
          // error may be null
          if (!error) {
            reject(Error('Error while receiving token'));
          }

          reject(error);
        });
    });

  useScript({
    src: generateScriptSrc({ siteKey, lang }),
    onload: handleLoadScript,
    onerror: handleErrorScript,
  });

  return {
    status,
    getRecaptchaToken,
  };
};

export default useRecaptcha;
