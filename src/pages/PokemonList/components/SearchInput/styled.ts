import { Text } from "@components";
import { theme } from "@styles/theme";
import styled from "styled-components";

export const StyledText = styled(Text)<{ capitalize?: boolean }>`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  text-transform: ${({ capitalize }) =>
    capitalize ? "capitalize" : "initial"};
  text-align: center;
`;

export const SearchInputContainer = styled.div`
  position: relative;
`;

export const StyledInput = styled.input`
  height: 2.2rem;
  display: flex;
  border-radius: 0.5rem;
  border: none;
  box-shadow: ${theme.shadow[0]};
  padding-left: 2rem;
  outline: none;
`;

export const SearchIconContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 2rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
`;
