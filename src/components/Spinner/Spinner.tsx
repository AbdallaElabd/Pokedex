import { animations } from '@styles/animations';
import { FunctionComponent } from 'react';
import styled, { keyframes } from 'styled-components';

import pokeball from './pokeball.png';

type Size = 'sm' | 'md' | 'lg';

const sizeMap: Record<Size, string> = {
  sm: '2rem',
  md: '3rem',
  lg: '4rem',
};

const StyledImage = styled.img<{ size: Size }>`
  width: ${({ size }) => sizeMap[size]};
  height: ${({ size }) => sizeMap[size]};
  --max-bounce: -0.6 * ${({ size }) => sizeMap[size]};
  animation: ${animations.bouncing} 1s ease-in-out infinite;
`;

interface SpinnerProps {
  className?: string;
  size?: Size;
}

export const Spinner: FunctionComponent<SpinnerProps> = ({
  className,
  size = 'lg',
}) => {
  return (
    <StyledImage
      className={className}
      src={pokeball}
      alt="Loading"
      size={size}
    />
  );
};
