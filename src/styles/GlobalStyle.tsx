import { createGlobalStyle } from "styled-components";

import { cssReset } from "./cssReset";
import { generateCssVariables } from "./generateCSSVariables";
import { themeValues } from "./theme";

export const GlobalStyle = createGlobalStyle`
  :root {
    font-family: 'Roboto', Inter, Avenir, Helvetica, Arial, sans-serif;
    ${generateCssVariables(themeValues).join("")};
  }

  ${cssReset};

  html, body {
    --font-size-base: 16px;
    --font-size-base: font-size: clamp(2rem, 4vw, 3rem);
    margin: 0 auto;
    font-size: var(--font-size-base);
    background-color: #E5E5E5;
  }

  body {
    min-width: 20rem;
    max-width: 90rem;
  }

  /* @media screen and (min-width: 320px) {
    html {
      --font-size-base: calc(var(--font-size-base) + 6 * ((100vw - 320px) / 680));
      
    }
  }
  @media screen and (min-width: 1000px) {
    html {
      --font-size-base: 22px;
    }
  } */

  #root {
    min-height: 100vh;
  }

  a {
    text-decoration: none;
  }
`;
