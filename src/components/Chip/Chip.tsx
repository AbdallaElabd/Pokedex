import { theme } from "@styles/theme";
import { PropsWithChildren } from "react";
import styled, { css } from "styled-components";

import { Text } from "../Text";

type ChipVariant = "primary" | "secondary" | "neutral";

const getColorsFromVariant = (variant: ChipVariant) => {
  const colors = {
    primary: theme.colors.primaryDark,
    secondary: theme.colors.secondaryDark,
    neutral: theme.colors.neutral,
  }[variant];
  return css`
    background: ${colors.background};
    color: ${colors.foreground};
  `;
};

const Container = styled.div<{ variant: ChipVariant }>`
  display: flex;
  align-items: center;
  border-radius: 0.75rem;
  padding: 0.25rem 0.5rem;
  ${({ variant }) => getColorsFromVariant(variant)};
`;

interface ChipProps {
  variant?: ChipVariant;
}

export function Chip({
  children,
  variant = "secondary",
}: PropsWithChildren<ChipProps>) {
  return (
    <Container variant={variant}>
      <Text variant="caption">{children}</Text>
    </Container>
  );
}
