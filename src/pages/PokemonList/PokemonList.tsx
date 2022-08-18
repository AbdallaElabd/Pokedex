import { Spinner } from '@components';
import { usePokedex } from '@providers/Pokedex';

import {
  PaginationButtons,
  PokemonCard,
  SearchInput,
  SortByDropdown,
} from './components';
import { NotFound } from './components/NotFound';
import { CardsContainer, Container, Separator, TopRow } from './styled';

export function PokemonList() {
  const { pokemonList, isLoading } = usePokedex();

  if (isLoading || !pokemonList) {
    return <Spinner />;
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
        <NotFound />
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
