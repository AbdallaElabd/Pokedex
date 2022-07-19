import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

type QueryParamType = "string" | "number";
type QueryParamPossibleType = number | string;

export const parseQueryParamValue = <T extends QueryParamPossibleType>(
  type: QueryParamType,
  value: string | null,
  defaultValue: T
): T => {
  if (value == null) return defaultValue;

  if (type === "number") {
    return (Number(value) as T) || defaultValue;
  }

  return (value as T) || defaultValue;
};

export const useQueryParam = <T extends QueryParamPossibleType>(
  type: QueryParamType,
  parameter: string,
  defaultValue: T
): [T, (text: T) => void] => {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = parseQueryParamValue(
    type,
    searchParams.get(parameter),
    defaultValue
  );

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
    [defaultValue, setSearchParams, parameter]
  );

  return [value, setValue];
};
