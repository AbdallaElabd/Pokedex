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
    one: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    two: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
    three: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
    four: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
    five: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
  },
  transition: {
    slow: "1s ease-out",
    normal: "0.3s ease-out",
    fast: "0.15s ease-out",
  },
} as const;

export type Theme = typeof themeValues;

export const theme = generateCssGetters(themeValues) as Theme;
