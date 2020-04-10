// eslint-disable-next-line import/no-extraneous-dependencies
import { renderHook } from '@testing-library/react-hooks';

import useRecaptcha from '../useRecaptcha';

describe('useRecaptcha', () => {
  const siteKey = '4becac2b-f363-4a97-a289-ad505c3b1636';

  jest.mock('react-script-hook');

  it('the default status is set correctly', () => {
    const { result } = renderHook(() => useRecaptcha({ siteKey }));
    const { status } = result.current;

    const expectedDefaultStatus = {
      loading: true,
      ready: false,
      error: null,
    };

    expect(status).toEqual(expectedDefaultStatus);
  });
});
