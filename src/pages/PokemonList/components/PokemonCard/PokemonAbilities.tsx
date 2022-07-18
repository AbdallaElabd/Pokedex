import { Text } from "@components";
import Highlighter from "react-highlight-words";

import { type PokemonCardProps } from "./PokemonCard";
import { AbilityIcon, HighlightedText, Pill, Pills } from "./styled";
import { capitalize } from "./utils";

export function PokemonAbilities({
  pokemon,
  searchBy,
  searchText,
}: PokemonCardProps) {
  return (
    <Pills>
      {pokemon.abilities.map(({ ability }) => (
        <Pill key={ability.name}>
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
        </Pill>
      ))}
    </Pills>
  );
}
