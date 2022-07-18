import { animations } from "@styles/animations";
import { theme } from "@styles/theme";
import styled, { css, keyframes } from "styled-components";

import noPokemonImage from "./no-pokemon.png";

const shimmer = keyframes`
0% {
  transform: translateX(-100%);
}
100% {
  transform: translateX(100%);
}
`;

export const StyledImage = styled.div<{
  image: string | undefined;
  status: AsyncStatus;
}>`
  display: flex;
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  animation: ${animations.fadeIn} ${theme.transition.normal};

  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;

  ${({ image, status }) => {
    if (status === "pending")
      return css`
        background-color: #e5e5e5;

        :after {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0,
            rgba(255, 255, 255, 0.2) 20%,
            rgba(255, 255, 255, 0.5) 60%,
            rgba(255, 255, 255, 0)
          );
          animation: ${shimmer} 1s infinite;
          content: "";
        }
      `;

    return css`
      background-image: url(${!image || status === "failed"
        ? noPokemonImage
        : image});
    `;
  }}
`;
