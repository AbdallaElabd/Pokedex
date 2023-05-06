import { Pokemon } from '@api/cache';
import { Abilities, Card, LazyImage, Text } from '@components';
import { faStairs, faWeightScale } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePokedex } from '@providers/Pokedex';
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
    <Link
      key={pokemonName}
      to="/pokemon/$pokemonName"
      params={{
        pokemonName: pokemon.name,
      }}
    >
      <Card className="flex gap-4">
        <LazyImage
          className="h-48 w-48"
          image={pokemon.sprites.other?.['official-artwork']?.front_default}
        />
        <div className="flex flex-col justify-between gap-2">
          <span className="mb-2 text-xl font-semibold">
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
              <Text variant="body2">{formatHeight(pokemon.height)}</Text>
            </div>

            <div className="flex items-center gap-1 text-sm">
              <FontAwesomeIcon icon={faWeightScale} />
              <Text variant="body2">{formatWeight(pokemon.weight)}</Text>
            </div>
          </div>
          <Abilities
            abilities={pokemon.abilities}
            highlightText={searchBy === 'ability' ? searchText : undefined}
          />
        </div>
      </Card>
    </Link>
  );
});
