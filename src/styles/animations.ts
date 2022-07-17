import { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
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

export const animations = { fadeIn, bouncing };
