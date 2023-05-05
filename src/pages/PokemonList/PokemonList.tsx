import { Spinner } from '@components';
import { usePokedex } from '@providers/Pokedex';

import {
  PaginationButtons,
  PokemonCard,
  SearchInput,
  SortByDropdown,
} from './components';
import { Container, Separator, TopRow } from './styled';

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
        <span className="my-16 font-sans text-lg">
          No Pokémon. Try a different search term.
        </span>
      ) : (
        <div className="columns-1 gap-4 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5">
          {pokemonList.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
      )}

      {pokemonList.length !== 0 && (
        <div className="place-self-end">
          <PaginationButtons />
        </div>
      )}
    </Container>
  );
}
