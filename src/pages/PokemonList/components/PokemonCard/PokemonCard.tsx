import { Pokemon } from "@api/cache";
import { Abilities, Text } from "@components";
import { faStairs, faWeightScale } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePokedex } from "@providers/Pokedex";
import { capitalize, formatHeight, formatWeight } from "@utils";
import { memo } from "react";
import Highlighter from "react-highlight-words";

import {
  Content,
  Details,
  HighlightedText,
  IconContainer,
  StyledCard,
  StyledLazyImage,
  StyledLink,
} from "./styled";

export interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard = memo(({ pokemon }: PokemonCardProps) => {
  const { searchText, searchBy } = usePokedex();

  const pokemonName = capitalize(pokemon.name);

  return (
    <StyledLink key={pokemonName} to={`/pokemon/${pokemon.name}`}>
      <StyledCard elevation={0}>
        <StyledLazyImage
          image={pokemon.sprites.other?.["official-artwork"]?.front_default}
        />
        <Content>
          <Text variant="h5">
            {searchBy === "name" ? (
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
            highlightText={searchBy === "ability" ? searchText : undefined}
          />
        </Content>
      </StyledCard>
    </StyledLink>
  );
});
