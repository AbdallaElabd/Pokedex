import { css } from "styled-components";

/**
 * @see https://www.joshwcomeau.com/css/custom-css-reset/
 */
export const cssReset = css`
  /* Use a more-intuitive box-sizing model. */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  /* Remove default margin */
  * {
    margin: 0;
  }
  html,
  body {
    min-height: 100%;
  }
  /* Improve text rendering */
  body {
    -webkit-font-smoothing: antialiased;
  }
  /* Improve media defaults */
  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  /* Avoid text overflows */
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }

  button {
    font-size: 1rem;
  }

  /* Create a root stacking context */
  #root {
    isolation: isolate;
  }
`;
