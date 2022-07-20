import { theme } from "@styles/theme";
import { ButtonHTMLAttributes, forwardRef, PropsWithChildren } from "react";
import styled, { css } from "styled-components";

type ButtonVariant = "primary" | "secondary" | "neutral";

const getColorsFromVariant = (variant: ButtonVariant) => {
  const colors = {
    primary: theme.colors.primaryDark,
    secondary: theme.colors.secondaryDark,
    neutral: theme.colors.surface,
  }[variant];
  return css`
    background: ${colors.background};
    color: ${colors.foreground};
  `;
};

const StyledButton = styled.button<{ variant: ButtonVariant }>`
  height: 2.2rem;
  padding: 0.6rem 0.8rem;
  border: none;
  border-radius: 0.5rem;
  cursor: ${({ disabled }) => (disabled ? "auto" : "pointer")};
  box-shadow: ${theme.shadow[0]};
  transition: box-shadow 0.2s;

  ${({ variant }) => getColorsFromVariant(variant)};

  ${({ disabled }) =>
    !disabled &&
    css`
      :hover,
      :active,
      :focus-visible {
        box-shadow: ${theme.shadow[1]};
        outline: 0;
      }
    `}
`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonProps>
>((props, ref) => {
  const { children, variant = "neutral", ...rest } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <StyledButton ref={ref} variant={variant} {...rest}>
      {children}
    </StyledButton>
  );
});
