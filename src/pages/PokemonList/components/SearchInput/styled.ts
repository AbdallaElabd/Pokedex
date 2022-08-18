import { Text } from '@components';
import { theme } from '@styles/theme';
import styled, { css } from 'styled-components';

export const StyledText = styled(Text)<{ capitalize?: boolean }>`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  text-transform: ${({ capitalize }) =>
    capitalize ? 'capitalize' : 'initial'};
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
  padding: 0 2rem;
  background: ${theme.colors.surface.background};
  color: ${theme.colors.surface.foreground};
  box-shadow: ${theme.shadow[0]};
  transition: box-shadow ${theme.transition.fast};
  &:hover,
  &:focus,
  &:focus-visible {
    outline: 0;
    box-shadow: ${theme.shadow[1]};
  }
`;

const IconContainer = css`
  position: absolute;
  top: 0;
  width: 2rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
`;

export const SearchIconContainer = styled.div`
  ${IconContainer};
  left: 0;
`;

export const ClearButtonContainer = styled.button<{ isShown: boolean }>`
  ${IconContainer};
  right: 0;
  background: none;
  border: none;
  cursor: pointer;

  transform-origin: center;
  opacity: ${({ isShown }) => (isShown ? 1 : 0)};
  transform: scale(${({ isShown }) => (isShown ? 0.9 : 0)});
  transition: opacity ${theme.transition.fast},
    transform ${theme.transition.fast};

  &:hover,
  &:focus-visible {
    outline: none;
    transform: scale(1.1);
  }
`;
