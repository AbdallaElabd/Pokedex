import { generateCssGetters } from "./generateCSSVariables";

const sandTan = "#e1b382";
const sandTanShadow = "#c89666";
const nightBlue = "#2d545e";
const nightBlueShadow = "#12343b";

// text: {
//   primary: '#FFFFFF',
//   secondary: '#E5E5E5',
// },
// background: {
//   backgroundAccent: '#14213D',
//   background: '#000000',
// },
// accent: '#FCA311',

/**
 * @see https://coolors.co/palette/000000-14213d-fca311-e5e5e5-ffffff
 */
export const themeValues = {
  colors: {
    primary: sandTan,
    primaryShadow: sandTanShadow,
    secondary: nightBlue,
    secondaryShadow: nightBlueShadow,
    white: "#fff",
    whiteDimmed: "#d3d3d3",
    black: "#000",
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
    fast: "0.15s ease-out",
  },
} as const;

export type Theme = typeof themeValues;

export const theme = generateCssGetters(themeValues) as Theme;
