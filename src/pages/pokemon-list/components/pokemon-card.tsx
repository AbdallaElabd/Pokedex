import { Pokemon } from '@api/cache';
import { PokemonSearchSchema } from '@api/search-pokemon-schema';
import { Abilities } from '@components/abilities';
import { Card } from '@components/card';
import { LazyImage } from '@components/lazy-image';
import {
  faChevronRight,
  faStairs,
  faWeightScale,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@tanstack/router';
import { capitalize, formatHeight, formatWeight } from '@utils';
import { memo } from 'react';
import Highlighter from 'react-highlight-words';

export interface PokemonCardProps {
  pokemon: Pokemon;
  searchText: string;
  searchBy: PokemonSearchSchema['searchBy'];
}

export const PokemonCard = memo(
  ({ pokemon, searchText, searchBy }: PokemonCardProps) => {
    const pokemonName = capitalize(pokemon.name);

    return (
      <Card className="flex w-full items-center gap-4 px-2 py-4">
        <LazyImage
          className="h-32 w-32 flex-shrink-0"
          image={pokemon.sprites.other?.['official-artwork']?.front_default}
        />
        <div className="flex h-full flex-grow flex-col justify-between gap-2">
          <span className="text-xl font-medium">
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
          className="rounded-md px-4 text-slate-400 outline-none transition-all hover:scale-105 hover:text-slate-500 focus:ring-2"
        >
          <FontAwesomeIcon icon={faChevronRight} size="lg" />
        </Link>
      </Card>
    );
  }
);
