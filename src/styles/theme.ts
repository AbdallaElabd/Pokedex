import { generateCssGetters } from "./generateCSSVariables";

// const sandTan = "#e1b382";
// const sandTanShadow = "#c89666";
// const nightBlue = "#2d545e";
// const nightBlueShadow = "#12343b";

export const themeValues = {
  /**
   * @see https://material.io/resources/color/#!/?primary.color=2d545e&secondary.color=e1a667
   */
  colors: {
    basePrimaryHue: "",
    primary: "#2d545e",
    primaryLight: "#618b96",
    primaryDark: "#102c34",
    secondary: "#d7843c",
    secondaryLight: "#ffb46a",
    secondaryDark: "#a1570b",
    background: "#e2e2e2",
    surface: "#fff",
    onPrimary: "#fff",
    onSecondary: "#000",
    onSuface: "#000",
    onBackground: "#000",
  },
  shadow: {
    0: "rgba(0, 0, 0, 0.15) 0px 0px 1px 0px, rgba(0, 0, 0, 0.2) 0px 1px 2px 0px, rgba(0, 0, 0, 0.2) 0px 1px 0px 0px",
    1: "rgba(0, 0, 0, 0.15) 0px 0px 1px 0px, rgba(0, 0, 0, 0.2) 0px 1px 2px 0px, rgba(0, 0, 0, 0.2) 0px 2px 2px 0.3px",
    2: "rgba(0, 0, 0, 0.15) 0px 0px 1px 0px, rgba(0, 0, 0, 0.2) 0px 1px 2px 0px, rgba(0, 0, 0, 0.2) 0px 3px 4px 0.6px",
    4: "rgba(0, 0, 0, 0.15) 0px 0px 1px 0px, rgba(0, 0, 0, 0.2) 0px 1px 2px 0px, rgba(0, 0, 0, 0.2) 0px 5px 8px 1.2px",
    8: "rgba(0, 0, 0, 0.15) 0px 0px 1px 0px, rgba(0, 0, 0, 0.2) 0px 1px 2px 0px, rgba(0, 0, 0, 0.2) 0px 9px 16px 2.4px",
    16: "rgba(0, 0, 0, 0.15) 0px 0px 1px 0px, rgba(0, 0, 0, 0.2) 0px 1px 2px 0px, rgba(0, 0, 0, 0.2) 0px 17px 32px 4.8px",
  },
  transition: {
    slow: "1s ease-out",
    normal: "0.3s ease-out",
    fast: "0.1s ease-out",
  },
  spacing: {
    1: "0.125rem",
    2: "0.25rem",
    3: "0.5rem",
    4: "1rem",
  },
} as const;

export type Theme = typeof themeValues;

export const theme = generateCssGetters(themeValues) as Theme;
