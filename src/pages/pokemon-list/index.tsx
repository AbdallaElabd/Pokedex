import { PokedexProvider } from '@providers/pokedex';

import { PokemonList } from './pokemon-list';

export function PokemonListPage() {
  return (
    <PokedexProvider>
      <PokemonList />
    </PokedexProvider>
  );
}
