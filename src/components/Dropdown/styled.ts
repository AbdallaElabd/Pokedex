import { animations } from "@styles/animations";
import { theme } from "@styles/theme";
import styled, { css } from "styled-components";

export const PopoverRoot = styled.div`
  display: flex;
  position: relative;
`;

export const PopoverContent = styled.div<{
  isOpen: boolean;
  position: "left" | "right";
}>`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  position: absolute;
  top: calc(100% + 2px);
  ${({ position }) =>
    position === "left"
      ? css`
          left: 0;
        `
      : css`
          right: 0;
        `}
  z-index: 1;
  flex-direction: column;
  width: 5rem;
  box-shadow: ${theme.shadow[2]};
  overflow: hidden;
  border-radius: 0.3rem;
  animation: ${animations.slideIn} ${theme.transition.fast};
`;

export const Option = styled.button<{ isSelected: boolean }>`
  background: ${({ isSelected }) => (isSelected ? "#eee" : "#fff")};
  padding: 0.5rem;
  cursor: pointer;
  border: none;

  :not(:last-child) {
    border-bottom: 1px solid lightgrey;
  }

  :hover,
  :focus {
    outline: 0;
    background: #eee;
  }
`;
