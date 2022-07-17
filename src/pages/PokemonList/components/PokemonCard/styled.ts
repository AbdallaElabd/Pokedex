import { Card, LazyImage } from "@components";
import { animations } from "@styles/animations";
import { theme } from "@styles/theme";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledLink = styled(Link)`
  display: flex;
`;
export const StyledLazyImage = styled(LazyImage)``;

export const Details = styled.div`
  display: grid;
  grid-template-columns: 1rem auto;
  gap: 0.5rem;
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Row = styled.span`
  display: flex;
  gap: 0.5rem;
`;

export const StyledCard = styled(Card)`
  flex-grow: 1;
  display: grid;
  grid-template-rows: 9rem auto;
  gap: 0.3rem;
  animation: ${animations.fadeIn} ${theme.transition.slow};
  color: ${theme.colors.black};
  font-size: 1rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 0.8rem;
  border-top: 1px solid #ddd;
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

export const HighlightedText = styled.mark`
  background-color: ${theme.colors.primary};
`;
