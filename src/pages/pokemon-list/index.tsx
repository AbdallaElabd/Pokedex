import { PokedexProvider } from '@providers/Pokedex';

import { PokemonList } from './pokemon-list';

export function PokemonListPage() {
  return (
    <PokedexProvider>
      <PokemonList />
    </PokedexProvider>
  );
}
