import {
  faChevronRight,
  faStairs,
  faWeightScale,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { type Pokemon } from "pokedex-promise-v2";
import { memo } from "react";
import Highlighter from "react-highlight-words";

import { PokemonSearchSchema } from "@/api/search-pokemon-schema";
import { Abilities } from "@/components/abilities";
import { Card } from "@/components/card";
import { LazyImage } from "@/components/lazy-image";
import { capitalize } from "@/utils/capitalize";
import { formatHeight, formatWeight } from "@/utils/format";

export interface PokemonCardProps {
  pokemon: Pokemon;
  searchText: string;
  searchBy: PokemonSearchSchema["searchBy"];
}

export const PokemonCard = memo(function PokemonCard({
  pokemon,
  searchText,
  searchBy,
}: PokemonCardProps) {
  const image = pokemon.sprites.other?.["official-artwork"].front_default;
  return (
    <Card className="relative flex w-full flex-grow flex-col items-start gap-2 px-2 py-4 text-slate-800">
      <div className="flex flex-grow gap-3">
        {image && <LazyImage className="h-32 w-32 shrink-0" image={image} />}
        <div className="flex flex-col gap-3">
          <span className="text-xl font-medium">
            {searchBy === "name" ? (
              <Highlighter
                highlightClassName="bg-yellow-300"
                searchWords={[searchText]}
                textToHighlight={capitalize(pokemon.name)}
              />
            ) : (
              capitalize(pokemon.name)
            )}
          </span>
          <div className="flex flex-grow flex-col gap-2">
            <div className="flex items-center gap-1 text-sm">
              <FontAwesomeIcon icon={faStairs} className="h-4 w-4" />

              {formatHeight(pokemon.height)}
            </div>

            <div className="flex items-center gap-1 text-sm">
              <FontAwesomeIcon icon={faWeightScale} className="h-4 w-4" />
              {formatWeight(pokemon.weight)}
            </div>
          </div>
        </div>
      </div>
      <Abilities
        abilities={pokemon.abilities}
        highlightText={searchBy === "ability" ? searchText : undefined}
      />
      <Link
        key={pokemon.name}
        href={`/pokemon/${pokemon.name}`}
        className="absolute right-1 top-1/2 flex h-12 w-12 origin-center -translate-y-1/2 items-center justify-center rounded-full px-4 text-slate-800 outline-none transition-all hover:scale-105 hover:text-slate-600 focus:ring-2"
      >
        <FontAwesomeIcon icon={faChevronRight} size="lg" />
      </Link>
    </Card>
  );
});
