import { PokedexProvider } from '@providers/Pokedex';

import { PokemonList } from './PokemonList';

export function PokemonListPage() {
  return (
    <PokedexProvider>
      <PokemonList />
    </PokedexProvider>
  );
}
