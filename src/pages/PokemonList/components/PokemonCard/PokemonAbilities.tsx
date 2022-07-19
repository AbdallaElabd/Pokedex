import { Text } from "@components";
import Highlighter from "react-highlight-words";

import { type PokemonCardProps } from "./PokemonCard";
import { Abilities, Ability, AbilityIcon, HighlightedText } from "./styled";
import { capitalize } from "./utils";

export function PokemonAbilities({
  pokemon,
  searchBy,
  searchText,
}: PokemonCardProps) {
  return (
    <Abilities>
      {pokemon.abilities.map(({ ability }) => (
        <Ability key={ability.name}>
          <Text variant="caption">
            <AbilityIcon />
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
        </Ability>
      ))}
    </Abilities>
  );
}
