import { usePokedex } from "@providers/Pokedex";

import {
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
  const { pokemonList, isLoading } = usePokedex();

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
        <SearchInput />
        <SortByDropdown />
        <PaginationButtons />
      </TopRow>

      <Separator />

      {pokemonList.length === 0 ? (
        <NotFound>No Pokémon. Try a different search term.</NotFound>
      ) : (
        <CardsContainer>
          {pokemonList.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </CardsContainer>
      )}

      {pokemonList.length !== 0 && <PaginationButtons />}
    </Container>
  );
}
