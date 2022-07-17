import { animations } from '@styles/animations';
import { theme } from '@styles/theme';
import styled, { css, keyframes } from 'styled-components';

import noPokemonImage from './no-pokemon.png';

const shimmer = keyframes`
0% {
  transform: translateX(-100%);
}
100% {
  transform: translateX(100%);
}
`;

export const Placeholder = styled.div<{ noImage: boolean }>`
display: flex;
position: relative;
overflow: hidden;
background-color: #e5e5e5;

${({ noImage }) => (noImage
    ? css`
        background-image: url(${noPokemonImage});
        background-size: contain;
        background-repeat: no-repeat;
      `
    : css`
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
          content: '';
        }
      `)}
`;

export const StyledImage = styled.img`
animation: ${animations.fadeIn} ${theme.transition.normal};
`;
