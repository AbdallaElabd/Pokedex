import { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const bouncing = keyframes`
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

export const animations = { fadeIn, slideIn, bouncing };
