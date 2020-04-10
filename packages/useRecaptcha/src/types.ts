type GRecaptchaResultToken = string;

export type GRecaptchaExecute = (
  siteKey: string,
  { action }: { action: string }
) => PromiseLike<GRecaptchaResultToken>;

export type RecaptchaWindow = typeof window & {
  grecaptcha: {
    ready: (cb: Function) => void;
    execute: GRecaptchaExecute;
  };
};

export type HookEntryParams = {
  siteKey: string;
  lang?: string;
};

export type GetRecaptchaToken = (
  action: string
) => Promise<GRecaptchaResultToken>;

export type ReadinessStatus = {
  loading: boolean;
  ready: boolean;
  error: Error | null;
};

export type ReturnedHookValue = {
  readinessStatus: ReadinessStatus;
  getRecaptchaToken: GetRecaptchaToken;
};
