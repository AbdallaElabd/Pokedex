import { Card } from "@components";
import { faBoltLightning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { animations } from "@styles/animations";
import { theme } from "@styles/theme";
import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledLink = styled(Link)`
  display: flex;

  &:focus {
    outline: 0;
  }
`;

export const StyledCard = styled(Card)`
  flex-grow: 1;
  display: grid;
  grid-template-rows: 9rem auto;
  animation: ${animations.fadeIn} ${theme.transition.slow};
  color: ${theme.colors.black};
  overflow: hidden;

  transition: box-shadow ${theme.transition.fast},
    transform ${theme.transition.fast};

  ${StyledLink}:focus & {
    outline: 0;
    transform-origin: center;
    transform: scale(1.01);
    box-shadow: ${theme.shadow[2]};
  }
`;

export function HighlightedText({ children }: PropsWithChildren) {
  return (
    <mark
      style={{
        backgroundColor: theme.colors.primary,
      }}
    >
      {children}
    </mark>
  );
}

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 0.8rem;
  border-top: 1px solid #ddd;
`;

export const Details = styled.div`
  display: grid;
  grid-template-columns: 1rem auto;
  align-items: center;
  column-gap: 0.5rem;
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Pills = styled.div`
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
`;

export const Pill = styled.div`
  display: flex;
  background: ${theme.colors.secondary};
  border-radius: 0.8rem;
  padding: 0.3rem 0.6rem;
  color: ${theme.colors.white};
`;

export const AbilityIcon = styled(FontAwesomeIcon).attrs({
  icon: faBoltLightning,
})`
  margin-right: 0.25rem;
`;
