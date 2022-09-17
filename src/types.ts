type GRecaptchaResultToken = string;

export type GRecaptchaExecute = (
  siteKey: string,
  { action }: { action: string },
) => PromiseLike<GRecaptchaResultToken>;

export type RecaptchaWindow = typeof window & {
  grecaptcha: {
    ready: (cb: Function) => void;
    execute: GRecaptchaExecute;
  };
};

export type HookEntryParams = {
  /**
   * @description reCAPTCHA v3 key (https://developers.google.com/recaptcha/docs/v3)
   */
  siteKey: string;
  /**
   * @description Google lang code (https://developers.google.com/recaptcha/docs/language)
   */
  lang?: string;
};

export type GetRecaptchaToken = (
  action: string,
) => Promise<GRecaptchaResultToken>;

export type ReadinessStatus = {
  loading: boolean;
  ready: boolean;
  error: Error | null;
};

export type ReturnedHookValue = {
  status: ReadinessStatus;
  getRecaptchaToken: GetRecaptchaToken;
};
