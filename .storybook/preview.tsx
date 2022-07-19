import React from "react";

import { GlobalStyle } from "../src/styles/GlobalStyle";
import { theme } from "../src/styles/theme";

export const parameters = {
  backgrounds: {
    default: "light",
    values: [
      {
        name: "light",
        value: "#fff",
      },
      {
        name: "dark",
        value: theme.colors.primaryDark,
      },
    ],
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <>
      <Story />
      <GlobalStyle />
    </>
  ),
];
