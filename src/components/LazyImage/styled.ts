import { animations } from '@styles/animations';
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

const fadeInAnimationDuration = '0.2s';

export const Container = styled.div<{ isLoading: boolean }>`
  display: flex;
  position: relative;
  overflow: hidden;
  transition: background-color ${fadeInAnimationDuration} ease-in-out;
  background-color: ${({ isLoading }) => (isLoading ? '#e5e5e5' : 'initial')};
`;

export const Shimmer = styled.div<{ isShown: boolean }>`
  display: ${({ isShown }) => (isShown ? 'flex' : 'none')};
  z-index: 1;
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
`;

export const StyledImage = styled.div<{
  image: string | undefined;
  status: AsyncStatus;
}>`
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  background-origin: content-box;

  opacity: 0;
  animation-name: ${animations.fadeIn};
  animation-delay: ${fadeInAnimationDuration};
  animation-duration: ${fadeInAnimationDuration};
  animation-fill-mode: forwards;

  ${({ image, status }) => {
    if (!image || status === 'failed')
      return css`
        padding: 0;
        background-image: url(${noPokemonImage});
      `;

    return css`
      background-image: url(${image});
    `;
  }}
`;
