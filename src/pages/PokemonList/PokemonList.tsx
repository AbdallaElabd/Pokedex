import { useGetPokemonList } from "@api/queries";

import {
  PageSizeDropdown,
  PaginationButtons,
  PokemonCard,
  SearchInput,
  SortByDropdown,
} from "./components";
import {
  CardsContainer,
  Container,
  NotFound,
  Separator,
  StyledSpinner,
  TopRow,
} from "./styled";

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
    searchBy,
    setSearchBy,
    changePageSize,
    pageSize,
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
        <SearchInput
          searchText={searchText}
          setSearchText={search}
          searchBy={searchBy}
          setSearchBy={setSearchBy}
        />
        <SortByDropdown
          sortBy={sortBy}
          sortOrder={sortOrder}
          setSortAttribute={setSortAttribute}
          toggleSortOrder={toggleSortOrder}
        />
        <div style={{ flex: 1 }} />
        <PageSizeDropdown changePageSize={changePageSize} pageSize={pageSize} />
        <PaginationButtons
          hasPrevious={hasPrevious}
          previous={previous}
          hasNext={hasNext}
          next={next}
        />
      </TopRow>

      <Separator />

      {pokemonList.length === 0 ? (
        <NotFound>No Pokémon. Try a different search term.</NotFound>
      ) : (
        <CardsContainer>
          {pokemonList.map((pokemon) => (
            <PokemonCard
              key={pokemon.name}
              pokemon={pokemon}
              searchText={searchText}
              searchBy={searchBy}
            />
          ))}
        </CardsContainer>
      )}

      {pokemonList.length !== 0 && (
        <PaginationButtons
          hasPrevious={hasPrevious}
          previous={previous}
          hasNext={hasNext}
          next={next}
        />
      )}
    </Container>
  );
}
