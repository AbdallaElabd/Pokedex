import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useQueryParam = <T>(
  type: 'string'|'number',
  parameter: string,
  defaultValue: T,
):[T, (text: T) => void] => {
  const [searchParams, setSearchParams] = useSearchParams();

  const valueFromURL = searchParams.get(parameter);

  const value = ((type === 'number') ? (Number(valueFromURL) || defaultValue) : (valueFromURL || defaultValue)) as T;

  const setValue = useCallback(
    (newValue: T) => {
      const newSearchParams = new URLSearchParams(window.location.search);

      if (newValue && newValue !== defaultValue) {
        newSearchParams.set(parameter, `${newValue}`);
      } else {
        newSearchParams.delete(parameter);
      }

      setSearchParams(newSearchParams.toString());
    },
    [defaultValue, setSearchParams, parameter],
  );

  return [value, setValue];
};
