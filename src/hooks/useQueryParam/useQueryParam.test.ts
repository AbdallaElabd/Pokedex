import { parseQueryParamValue } from './useQueryParam';

describe('parseQueryParamValue', () => {
  it('should', () => {
    expect(parseQueryParamValue('number', '1234', 0)).toBe(1234);
  });
});
