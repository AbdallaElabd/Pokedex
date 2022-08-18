import { createGlobalStyle } from 'styled-components';

import { cssReset } from './cssReset';
import { generateCssVariables } from './generateCSSVariables';
import { theme, themeValues } from './theme';

export const GlobalStyle = createGlobalStyle`
  ${cssReset};

  :root {
    font-family: 'Roboto', Inter, Avenir, Helvetica, Arial, sans-serif;
    ${generateCssVariables(themeValues).join('')};
    font-size: 16px;
  }

  html, body {
    margin: 0 auto;
    background-color: ${theme.colors.background};
    color: ${theme.colors.surface.foreground};
    /**
      * Fluid Typography
      * @see https://clamp.font-size.app/?config=eyJyb290IjoiMTYiLCJtaW5XaWR0aCI6IjMyMHB4IiwibWF4V2lkdGgiOiIxMjAwcHgiLCJtaW5Gb250U2l6ZSI6IjE2cHgiLCJtYXhGb250U2l6ZSI6IjM2cHgifQ%3D%3D
      */
    font-size: clamp(1.6rem, 0.5rem + 2vw, 2.25rem);
  }

  body {
    min-width: 20rem;
    max-width: 90rem;
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  a {
    text-decoration: none;
  }

  input[type="text"] {
    -webkit-appearance: none;
  }
`;
