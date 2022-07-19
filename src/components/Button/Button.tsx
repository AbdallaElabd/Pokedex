/* eslint-disable react/jsx-props-no-spreading */
import { theme } from "@styles/theme";
import { ButtonHTMLAttributes, forwardRef, PropsWithChildren } from "react";
import styled, { css } from "styled-components";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary";
}

const StyledButton = styled.button<ButtonProps>`
  height: 2.2rem;
  padding: 0.6rem 0.8rem;
  border: none;
  border-radius: 0.5rem;
  cursor: ${({ disabled }) => (disabled ? "auto" : "pointer")};
  box-shadow: ${theme.shadow[0]};
  transition: box-shadow 0.2s;
  background-color: ${theme.colors.surface};

  ${({ disabled }) =>
    !disabled &&
    css`
      :hover,
      :active,
      :focus {
        box-shadow: ${theme.shadow[1]};
        outline: none;
      }
    `}
`;

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonProps>
>((props, ref) => {
  const { children, ...rest } = props;
  return (
    <StyledButton ref={ref} {...rest}>
      {children}
    </StyledButton>
  );
});
