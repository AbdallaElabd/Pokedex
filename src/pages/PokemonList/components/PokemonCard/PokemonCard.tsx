import { Pokemon } from "@api/cache";
import { SearchByAttribute } from "@api/queries";
import { LazyImage, Text } from "@components";
import { faStairs, faWeightScale } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";
import Highlighter from "react-highlight-words";

import { PokemonAbilities } from "./PokemonAbilities";
import {
  Content,
  Details,
  HighlightedText,
  IconContainer,
  StyledCard,
  StyledLink,
} from "./styled";
import { capitalize } from "./utils";

export interface PokemonCardProps {
  pokemon: Pokemon;
  searchText: string;
  searchBy: SearchByAttribute;
}

export const PokemonCard = memo(
  ({ pokemon, searchText, searchBy }: PokemonCardProps) => {
    const pokemonName = capitalize(pokemon.name);

    return (
      <StyledLink key={pokemonName} to={`/pokemon/${pokemon.name}`}>
        <StyledCard elevation={0}>
          <LazyImage
            src={pokemon.sprites.other?.["official-artwork"]?.front_default}
            alt={pokemonName}
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
                <Text variant="body2">{`${pokemon.height} decimetres`}</Text>
              </>
              <>
                <IconContainer>
                  <FontAwesomeIcon icon={faWeightScale} />
                </IconContainer>
                <Text variant="body2">{`${pokemon.weight} hectograms`}</Text>
              </>
            </Details>
            {pokemon.abilities.length > 0 && (
              <PokemonAbilities
                pokemon={pokemon}
                searchText={searchText}
                searchBy={searchBy}
              />
            )}
          </Content>
        </StyledCard>
      </StyledLink>
    );
  }
);
