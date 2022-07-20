import { animations } from "@styles/animations";
import { theme } from "@styles/theme";
import styled from "styled-components";

import { Text } from "../Text";
import pokeball from "./pokeball.png";

type Size = "sm" | "md" | "lg";

const sizeMap: Record<Size, string> = {
  sm: "2rem",
  md: "3rem",
  lg: "4rem",
};

const StyledImage = styled.img<{ size: Size }>`
  width: ${({ size }) => sizeMap[size]};
  height: ${({ size }) => sizeMap[size]};
  --max-bounce: -0.6 * ${({ size }) => sizeMap[size]};
  animation: ${animations.bouncing} 1s ease-in-out infinite;
`;

export const SpinnerContainer = styled.div`
  animation: ${animations.fadeIn} ${theme.transition.normal};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  padding: 2rem 0;
`;

interface SpinnerProps {
  className?: string;
  size?: Size;
}

export function Spinner({ className, size = "lg" }: SpinnerProps) {
  return (
    <SpinnerContainer>
      <StyledImage
        className={className}
        src={pokeball}
        alt="Loading"
        size={size}
      />
      <Text variant="h6">Loading Pokédex...</Text>
    </SpinnerContainer>
  );
}
