import { Text } from "@components";
import { usePokedex } from "@providers/Pokedex";
import { capitalize } from "@utils";
import Highlighter from "react-highlight-words";

import { type PokemonCardProps } from "./PokemonCard";
import { Abilities, Ability, AbilityIcon, HighlightedText } from "./styled";

export function PokemonAbilities({ pokemon }: PokemonCardProps) {
  const { searchBy, searchText } = usePokedex();
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
