import { Pokemon } from "@api/cache";
import { SearchByAttribute } from "@api/queries";
import { Text } from "@components";
import {
  faRulerVertical,
  faWeightHanging,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";
import Highlighter from "react-highlight-words";

import {
  Content,
  Details,
  HighlightedText,
  IconContainer,
  Pill,
  Pills,
  StyledCard,
  StyledLazyImage,
  StyledLink,
} from "./styled";

interface PokemonCardProps {
  pokemon: Pokemon;
  searchText: string;
  searchBy: SearchByAttribute;
}

const capitalize = (text: string) =>
  text
    .split("-")
    .map((word) => `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`)
    .join(" ");

export const PokemonCard = memo(
  ({ pokemon, searchText, searchBy }: PokemonCardProps) => {
    const pokemonName = capitalize(pokemon.name);

    return (
      <StyledLink key={pokemonName} to={`/pokemon/${pokemon.name}`}>
        <StyledCard>
          <StyledLazyImage
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
                  <FontAwesomeIcon icon={faRulerVertical} size="1x" />
                </IconContainer>
                <Text variant="body2">{`${pokemon.height} decimetres`}</Text>
              </>
              <>
                <IconContainer>
                  <FontAwesomeIcon icon={faWeightHanging} size="1x" />
                </IconContainer>
                <Text variant="body2">{`${pokemon.weight} hectograms`}</Text>
              </>
            </Details>
            {pokemon.abilities.length > 0 && (
              <Pills>
                {pokemon.abilities.map(({ ability }) => (
                  <Pill key={ability.name}>
                    <Text variant="caption">
                      {searchBy === "ability" ? (
                        <Highlighter
                          highlightTag={HighlightedText}
                          searchWords={[searchText]}
                          textToHighlight={capitalize(ability.name)}
                        />
                      ) : (
                        capitalize(ability.name)
                      )}
                    </Text>
                  </Pill>
                ))}
              </Pills>
            )}
          </Content>
        </StyledCard>
      </StyledLink>
    );
  }
);
