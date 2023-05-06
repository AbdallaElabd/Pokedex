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
      <Card className="relative flex w-full flex-grow flex-col items-start gap-2 px-2 py-4">
        <div className="flex flex-grow gap-3">
          <LazyImage
            className="h-32 w-32 shrink-0"
            image={pokemon.sprites.other?.['official-artwork']?.front_default}
          />
          <div className="flex flex-col gap-3">
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
            <div className="flex flex-grow flex-col gap-2">
              <div className="flex items-center gap-1 text-sm">
                <FontAwesomeIcon icon={faStairs} />
                {formatHeight(pokemon.height)}
              </div>

              <div className="flex items-center gap-1 text-sm">
                <FontAwesomeIcon icon={faWeightScale} />
                {formatWeight(pokemon.weight)}
              </div>
            </div>
          </div>
        </div>
        <Abilities
          abilities={pokemon.abilities}
          highlightText={searchBy === 'ability' ? searchText : undefined}
        />
        <Link
          key={pokemonName}
          to="/pokemon/$pokemonName"
          params={{ pokemonName: pokemon.name }}
          className="absolute right-1 top-1/2 flex h-12 w-12 origin-center -translate-y-1/2 items-center justify-center rounded-full px-4 text-slate-800 outline-none transition-all hover:scale-105 hover:text-slate-600 focus:ring-2"
        >
          <FontAwesomeIcon icon={faChevronRight} size="lg" />
        </Link>
      </Card>
    );
  }
);
