import {
  ButtonHTMLAttributes,
  FunctionComponent,
  HTMLProps,
  PropsWithChildren,
} from "react";
import styled from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary";
}

export const Button: FunctionComponent<PropsWithChildren<ButtonProps>> = ({
  children,
  ...rest
}) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};

const StyledButton = styled.button`
  padding: 0.9rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  transition: box-shadow 0.2s;

  :hover,
  :active {
    box-shadow: rgb(0 0 0 / 24%) 0px 1px 3px;
    outline: none;
  }
`;
