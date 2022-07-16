import { animations } from '@styles/animations';
import {
  FunctionComponent,
  ImgHTMLAttributes,
  useEffect,
  useState,
} from 'react';
import styled, { keyframes } from 'styled-components';

export const LazyImage: FunctionComponent<
  ImgHTMLAttributes<HTMLImageElement>
> = ({ src, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!src) return;
    const image = new Image();
    image.src = src;
    // image.onload = () => () => setLoaded(true);
    image.onload = () => setTimeout(() => setLoaded(true), 2000);
  }, [src]);
  if (!src || !loaded) return <Placeholder {...rest} />;
  return <StyledImage src={src} {...rest} />;
};

const shimmer = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const Placeholder = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;
  background-color: #dddbdd;

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
`;
const StyledImage = styled.img`
  animation: ${animations.fadeIn} 0.3s ease-out;
`;
