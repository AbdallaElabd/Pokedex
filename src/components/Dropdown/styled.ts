import { theme } from '@styles/theme';
import styled from 'styled-components';

export const PopoverRoot = styled.div`
  display: flex;
  position: relative;
`;

export const PopoverContent = styled.div<{
  isOpen: boolean;
}>`
  visibility: ${({ isOpen }) => (isOpen ? 'visibile' : 'hidden')};
  pointer-events: visible;
  display: flex;
  position: absolute;
  transition: opacity ${theme.transition.fast};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  z-index: 1;
  flex-direction: column;
  width: 5rem;
  box-shadow: ${theme.shadow[2]};
  overflow: hidden;
  border-radius: 0.3rem;
`;

export const Option = styled.button<{ isSelected: boolean }>`
  background: ${({ isSelected }) =>
    isSelected ? theme.colors.background : theme.colors.surface.background};
  padding: 0.5rem;
  cursor: pointer;
  border: none;

  :not(:last-child) {
    border-bottom: 1px solid ${theme.colors.background};
  }

  :hover,
  :focus-visible {
    outline: 0;
    background: ${theme.colors.background};
  }
`;
