import { useGetPokemonList } from '@api/queries';
import { Spinner } from '@components';
import { PaginationButtons } from './PaginationButtons';

import styled, { css } from 'styled-components';

import { PokemonCard } from './PokemonCard';
import { SortByDropdown } from './SortByDropdown';
import { onXS, onLarge, onSmall, onBreakPoint } from '../../styles';

export const PokemonList = () => {
  const {
    sortBy,
    setSortAttribute,
    sortOrder,
    toggleSortOrder,
    pokemonList,
    isLoading,
    hasPrevious,
    previous,
    hasNext,
    next,
  } = useGetPokemonList();

  if (isLoading || !pokemonList)
    return (
      <Container>
        <StyledSpinner />
      </Container>
    );

  return (
    <Container>
      <TopRow>
        <SortByDropdown
          sortBy={sortBy}
          sortOrder={sortOrder}
          setSortAttribute={setSortAttribute}
          toggleSortOrder={toggleSortOrder}
        />
        <PaginationButtons {...{ hasPrevious, previous, hasNext, next }} />
      </TopRow>
      <CardsContainer>
        {pokemonList.map((pokemon) => (
          <PokemonCard pokemon={pokemon} key={pokemon.name} />
        ))}
      </CardsContainer>
      <PaginationButtons {...{ hasPrevious, previous, hasNext, next }} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 30vh;
  gap: 1rem;
`;

const StyledSpinner = styled(Spinner)`
  margin: 4rem 0;
`;

const TopRow = styled.div`
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  gap: 2rem;

  --columns: 1;
  ${onBreakPoint(
    'sm',
    css`
      --columns: 2;
    `
  )};
  ${onBreakPoint(
    'md',
    css`
      --columns: 3;
    `
  )};
  ${onBreakPoint(
    'lg',
    css`
      --columns: 5;
    `
  )};
`;
