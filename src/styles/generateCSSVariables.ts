import { type Theme } from "./theme";

/**
 * Converts a theme object into a lits of css variables defintions.
 */
export const generateCssVariables = (theme: Theme, prefix = ""): string[] =>
  Object.entries(theme).reduce<string[]>((cssVariables, [key, value]) => {
    if (typeof value === "object") {
      return [
        ...cssVariables,
        ...generateCssVariables(value as unknown as Theme, `${prefix}${key}-`),
      ];
    }
    return [...cssVariables, `--${prefix}${key}: ${value};`];
  }, []);

type NestedObject = {
  [key: string]: string | NestedObject;
};

export const generateCssGetters = (
  theme: NestedObject,
  prefix = ""
): NestedObject =>
  Object.entries(theme).reduce<NestedObject>(
    (gettersObject, [key, value]) => ({
      ...gettersObject,
      [key]:
        typeof value === "string"
          ? `var(--${prefix}${key})`
          : generateCssGetters(value, `${prefix}${key}-`),
    }),
    {}
  );
