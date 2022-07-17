import { Button } from "@components";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const Option = styled.button<{ isSelected: boolean }>`
  padding: 0.5rem;
  text-transform: capitalize;

  border: none;
  background: ${({ isSelected }) => (isSelected ? "#fff" : "#fff")};
  cursor: pointer;

  :not(:last-child) {
    border-bottom: 1px solid lightgrey;
  }

  border-radius: 0;
  box-shadow: none;

  :hover,
  :focus {
    outline: 0;
    box-shadow: none;
  }
`;

export const StyledButton = styled(Button)`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  text-transform: capitalize;
`;
