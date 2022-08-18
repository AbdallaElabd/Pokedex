import { onBreakPoint } from '@styles';
import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  ${onBreakPoint(
    'sm',
    css`
      display: grid;
      grid-template-columns: auto auto;
      grid-template-areas: 'content image';
    `
  )};
`;

export const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-area: image;
  padding: 1rem;
  gap: 1.5rem;

  ${onBreakPoint(
    'sm',
    css`
      box-shadow: none;
    `
  )};
`;

export const DetailsSection = styled.div`
  grid-area: content;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem;
`;

export const PokemonImage = styled.img`
  width: 20rem;
`;
