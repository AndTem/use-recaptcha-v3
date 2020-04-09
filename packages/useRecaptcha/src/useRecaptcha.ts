import { useState, useRef } from 'react';
import useScript from 'react-script-hook';

import { generateScriptSrc } from './utils';

import {
  GRecaptchaExecute,
  RecaptchaWindow,
  HookEntryParams,
  RecaptchaExecute,
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
  const executeFuncContainer = useRef<RecaptchaExecute | null>(null);

  const createExecuteFunc = (recaptchaExecute: GRecaptchaExecute) => {
    executeFuncContainer.current = (action: string) =>
      Promise.resolve(recaptchaExecute(siteKey, { action }));
  };

  const handleLoadScript = () => {
    (window as RecaptchaWindow).grecaptcha.ready(() => {
      createExecuteFunc((window as RecaptchaWindow).grecaptcha.execute);

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

  const executeRecaptcha: RecaptchaExecute = async (action: string) => {
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
    executeRecaptcha,
  };
};

export default useRecaptcha;
