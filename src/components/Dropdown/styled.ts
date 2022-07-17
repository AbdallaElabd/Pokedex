import { theme } from "@styles/theme";
import styled from "styled-components";

export const Content = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  min-width: 110%;
  z-index: 1;
  box-shadow: ${theme.shadow.two};
  border-radius: 0.3rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  opacity: 0;
  transform: translateY(-1rem);
  transition: opacity ${theme.transition.normal},
    transform ${theme.transition.normal};
  pointer-events: none;
`;

export const DropDownButton = styled.div`
  position: relative;

  :hover,
  :active,
  :focus-within {
    & ${Content} {
      pointer-events: auto;
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
