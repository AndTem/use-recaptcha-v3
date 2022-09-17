# React useRecaptcha v3

This hook loads the google-recaptcha script and allows you to get recaptcha token.

# Installation
```
npm install --save use-recaptcha-v3
```

# Usage

```jsx
import React from 'react';
import Loader from 'loader-lib';
import ajax from 'ajax-lib';
import useRecaptcha from 'use-recaptcha-v3';

const GRECAPTCHA_SITE_KEY = 'site_key';
const CURRENT_LANG = 'ru';
const RECAPTCHA_ACTION = 'test_action';

const RecaptchaExample = () => {
  const { status, getRecaptchaToken } = useRecaptcha({
    siteKey: GRECAPTCHA_SITE_KEY,
    lang: CURRENT_LANG
  });
  const { loading, ready, error } = status;

  const handleSendData = async () => {
    try {
      const recaptchaToken = await getRecaptchaToken(RECAPTCHA_ACTION);

      ajax('/sendData').post({ recaptchaToken, otherData: {} })
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {loading && <Loader />}
      {ready && <button onClick={handleSendData}>Send data to sever</button>}
      {error && <p>{error.message}</p>}
    </div>
  );
};
```

# API
```js
const { status, getRecaptchaToken } = useRecaptcha({ siteKey, lang });
```

## Entry params
```entryParams```: ```required <Object>```
  * ```siteKey```: ```required <String>```. reCAPTCHA v3 key (https://g.co/recaptcha/v3)
  * ```lang```: ```<String>```. Google lang code (https://developers.google.com/recaptcha/docs/language)

## Returned hook value
```returnedHookValue```: ```<Object>```
  * ```status```: ```<Object>```
    * ```loading```: ```<Boolean>```. Flag indicating that recaptcha is loading
    * ```ready```: ```<Boolean>```. Flag indicating recaptcha readiness. Script loaded successfully grecaptcha ready to go
    * ```error```: ```<Error>```. Error that occurred while loading the script
  * ```getRecaptchaToken```: ```<Function>```.

### getRecaptchaToken API
```ts
type GetRecaptchaToken = (action: string) => Promise<string>;
```

* Takes parameter ```action``` - reCAPTCHA v3 action (https://developers.google.com/recaptcha/docs/v3)
* Returns Promise with a recaptcha token which must then be passed to the backend.
