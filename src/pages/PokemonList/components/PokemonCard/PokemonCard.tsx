import { Pokemon } from '@api/cache';
import { Abilities, LazyImage, Text } from '@components';
import { faStairs, faWeightScale } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePokedex } from '@providers/Pokedex';
import { capitalize, formatHeight, formatWeight } from '@utils';
import { memo } from 'react';
import Highlighter from 'react-highlight-words';

import {
  Content,
  Details,
  HighlightedText,
  IconContainer,
  StyledCard,
  StyledLazyImage,
  StyledLink,
} from './styled';

export interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard = memo(({ pokemon }: PokemonCardProps) => {
  const { searchText, searchBy } = usePokedex();

  const pokemonName = capitalize(pokemon.name);

  return (
    <StyledLink key={pokemonName} to={`/pokemon/${pokemon.name}`}>
      <div className="w-full overflow-hidden rounded-md shadow-md transition-all hover:scale-105 hover:shadow-lg">
        <LazyImage
          className="h-48 w-full object-cover"
          image={pokemon.sprites.other?.['official-artwork']?.front_default}
        />
        <div className="p-4">
          <Text variant="h5">
            {searchBy === 'name' ? (
              <Highlighter
                highlightTag={HighlightedText}
                searchWords={[searchText]}
                textToHighlight={pokemonName}
              />
            ) : (
              pokemonName
            )}
          </Text>
          <Details>
            <>
              <IconContainer>
                <FontAwesomeIcon icon={faStairs} />
              </IconContainer>
              <Text variant="body2">{formatHeight(pokemon.height)}</Text>
            </>
            <>
              <IconContainer>
                <FontAwesomeIcon icon={faWeightScale} />
              </IconContainer>
              <Text variant="body2">{formatWeight(pokemon.weight)}</Text>
            </>
          </Details>
          <Abilities
            abilities={pokemon.abilities}
            highlightText={searchBy === 'ability' ? searchText : undefined}
          />
        </div>
      </div>
    </StyledLink>
  );
});
