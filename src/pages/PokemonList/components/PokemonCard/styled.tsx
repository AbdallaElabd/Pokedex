import { Card, LazyImage } from "@components";
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
  animation: ${animations.fadeIn} ${theme.transition.normal};
  background-color: ${theme.colors.surface};
  color: ${theme.colors.onSuface};
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

export const StyledLazyImage = styled(LazyImage)`
  height: 100%;
  padding: ${theme.spacing[4]};
`;

export function HighlightedText({ children }: PropsWithChildren) {
  return (
    <mark
      style={{
        backgroundColor: theme.colors.secondaryLight,
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
  gap: ${theme.spacing[4]};
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

export const Abilities = styled.div`
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
`;

export const Ability = styled.div`
  display: flex;
  background: ${theme.colors.primaryDark};
  color: ${theme.colors.onPrimary};
  border-radius: 0.8rem;
  padding: 0.3rem 0.6rem;
`;

export const AbilityIcon = styled(FontAwesomeIcon).attrs({
  icon: faBoltLightning,
})`
  margin-right: 0.25rem;
`;
