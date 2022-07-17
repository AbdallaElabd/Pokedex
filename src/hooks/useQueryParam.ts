import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

type UseQueryParamReturn<T> = [T, (text: T) => void];

export function useQueryParam<T extends string>(
  parameter: string,
  defaultValue: T,
): UseQueryParamReturn<T> {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = (searchParams.get(parameter) || defaultValue) as T;

  const setValue = useCallback(
    (newValue: T) => {
      const newSearchParams = new URLSearchParams(searchParams);

      if (newValue) {
        newSearchParams.set(parameter, newValue);
      } else {
        newSearchParams.delete(parameter);
      }

      setSearchParams(newSearchParams.toString());
    },
    [searchParams, setSearchParams, parameter],
  );

  return [value, setValue];
}
