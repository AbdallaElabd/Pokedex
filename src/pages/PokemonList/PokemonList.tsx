import { useGetPokemonList } from "@api/queries";
import { Spinner } from "@components";
import { PaginationButtons } from "./PaginationButtons";

import styled from "styled-components";

import { PokemonCard } from "./PokemonCard";
import { SortByDropdown } from "./SortByDropdown";

export const PokemonList = () => {
  const {
    sortBy,
    setSortBy,
    sortOrder,
    toggleSortOrder,
    pokemonList,
    isLoading,
    hasPrevious,
    previous,
    hasNext,
    next,
  } = useGetPokemonList();

  if (isLoading || !pokemonList) return <Spinner />;

  console.log({ isLoading, pokemonList, sortBy, sortOrder });

  return (
    <Container>
      <TopRow>
        <SortByDropdown
          sortBy={sortBy}
          sortOrder={sortOrder}
          setSortBy={setSortBy}
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
  gap: 1rem;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  row-gap: 1rem;
  column-gap: 2rem;
`;
