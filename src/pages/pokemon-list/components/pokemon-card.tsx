import { Pokemon } from '@api/cache';
import { Abilities } from '@components/abilities';
import { Card } from '@components/card';
import { LazyImage } from '@components/lazy-image';
import {
  faChevronRight,
  faStairs,
  faWeightScale,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePokedex } from '@providers/pokedex';
import { Link } from '@tanstack/router';
import { capitalize, formatHeight, formatWeight } from '@utils';
import { memo } from 'react';
import Highlighter from 'react-highlight-words';

export interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard = memo(({ pokemon }: PokemonCardProps) => {
  const { searchText, searchBy } = usePokedex();

  const pokemonName = capitalize(pokemon.name);

  return (
    <Card className="flex items-center gap-4 p-2">
      <LazyImage
        className="h-36 w-36"
        image={pokemon.sprites.other?.['official-artwork']?.front_default}
      />
      <div className="flex flex-col justify-between gap-2">
        <span className="mb-2 text-xl font-medium">
          {searchBy === 'name' ? (
            <Highlighter
              highlightClassName="bg-yellow-300"
              searchWords={[searchText]}
              textToHighlight={pokemonName}
            />
          ) : (
            pokemonName
          )}
        </span>

        <div className="flex flex-grow flex-col gap-1">
          <div className="flex items-center gap-1 text-sm">
            <FontAwesomeIcon icon={faStairs} />
            <span className="text-sm">{formatHeight(pokemon.height)}</span>
          </div>

          <div className="flex items-center gap-1 text-sm">
            <FontAwesomeIcon icon={faWeightScale} />
            <span className="text-sm">{formatWeight(pokemon.weight)}</span>
          </div>
        </div>
        <Abilities
          abilities={pokemon.abilities}
          highlightText={searchBy === 'ability' ? searchText : undefined}
        />
      </div>
      <Link
        key={pokemonName}
        to="/pokemon/$pokemonName"
        params={{
          pokemonName: pokemon.name,
        }}
        className="rounded-md p-4 text-slate-400 outline-none transition-all hover:scale-105 hover:text-slate-500 focus:ring-2"
      >
        <FontAwesomeIcon icon={faChevronRight} size="lg" />
      </Link>
    </Card>
  );
});
