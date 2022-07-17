import { useGetPokemonList } from '@api/queries';

import {
  PaginationButtons, PokemonCard, SearchInput, SortByDropdown,
} from './components';
import {
  CardsContainer, Container, StyledSpinner, TopRow,
} from './styled';

export function PokemonList() {
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
    search,
    searchText,
  } = useGetPokemonList();

  if (isLoading || !pokemonList) {
    return (
      <Container>
        <StyledSpinner />
      </Container>
    );
  }

  return (
    <Container>
      <TopRow>
        <SearchInput searchText={searchText} setSearchText={search} />
        <SortByDropdown
          sortBy={sortBy}
          sortOrder={sortOrder}
          setSortAttribute={setSortAttribute}
          toggleSortOrder={toggleSortOrder}
        />
        <PaginationButtons {...{
          hasPrevious, previous, hasNext, next,
        }}
        />
      </TopRow>
      <CardsContainer>
        {pokemonList.map((pokemon) => (
          <PokemonCard pokemon={pokemon} key={pokemon.name} />
        ))}
      </CardsContainer>
      <PaginationButtons {...{
        hasPrevious, previous, hasNext, next,
      }}
      />
    </Container>
  );
}
