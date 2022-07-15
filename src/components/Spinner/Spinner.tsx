import styled, { keyframes } from "styled-components";
import pokeball from "./pokeball.png";

export const Spinner = () => {
  return <StyledImage src={pokeball} alt="Loading" />;
};

const bouncingAnimation = keyframes`
  20%,50%,80%,to {
    transform: translateY(0);
  }
  40% {
    transform: translateY(calc(var(--max-bounce) / 2))
  }
  70% {
    transform: translateY(calc(var(--max-bounce) / 3))
  }
  90% {
    transform: translateY(calc(var(--max-bounce) / 8))
  }
`;

const StyledImage = styled.img`
  --size: 2rem;
  width: var(--size);
  height: var(--size);
  --max-bounce: -0.6 * var(--size);
  animation: ${bouncingAnimation} 1s ease-in-out infinite;
`;
