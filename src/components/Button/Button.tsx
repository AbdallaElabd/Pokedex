/* eslint-disable react/jsx-props-no-spreading */
import { theme } from '@styles/theme';
import {
  ButtonHTMLAttributes,
  PropsWithChildren,
} from 'react';
import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  padding: 0.6rem 0.8rem;
  border: none;
  border-radius: 0.5rem;
  cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};

  box-shadow: ${theme.shadow.one};
  transition: box-shadow 0.2s;
  background-color: ${theme.colors.white};

  ${({ disabled }) => !disabled && css`
    :hover,
    :active,
    :focus {
      box-shadow: ${theme.shadow.two};
      outline: none;
    }
  `}
`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary';
}

export function Button({
  children,
  ...rest
}:PropsWithChildren<ButtonProps>) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}
