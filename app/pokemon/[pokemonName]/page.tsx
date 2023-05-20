import { pokemonCache } from "@/api/cache";
import { Abilities } from "@/components/abilities";
import { Chip } from "@/components/chip";
import { Spinner } from "@/components/spinner";
import { capitalize } from "@/utils/capitalize";
import { formatHeight, formatWeight } from "@/utils/format";
import {
  faArrowLeft,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default async function PokemonDetails({
  params: { pokemonName },
}: {
  params: { pokemonName: string };
}) {
  const pokemon = await pokemonCache.getPokemonByName(pokemonName);

  if (!pokemon)
    return (
      <div className="flex flex-col gap-2 py-8 text-center text-slate-800">
        <FontAwesomeIcon icon={faExclamationTriangle} size="2x" />
        <span className="text-2xl font-light">Pokemon not found</span>
      </div>
    );

  return (
    <div className="relative flex flex-col gap-4 p-8 text-slate-800 md:flex-row">
      <Link href="/">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="absolute left-4 top-4 h-10 w-10 cursor-pointer text-2xl"
        />
      </Link>
      <div className="flex flex-col items-center gap-2">
        <span className="text-4xl font-light">{capitalize(pokemon.name)}</span>
        <img
          className="w-2/3 min-w-[200px]"
          alt={pokemon.name}
          src={pokemon.sprites.other["official-artwork"]?.front_default}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span>{`Height: ${formatHeight(pokemon.height)}`}</span>
        <span>{`Weight: ${formatWeight(pokemon.weight)}`}</span>
        <span>{`Base experience: ${pokemon.base_experience}`}</span>
        <div className="flex flex-wrap items-baseline gap-2">
          <span>Stats</span>
          <div className="flex flex-wrap items-center gap-2">
            {pokemon.stats.map((stat) => (
              <Chip
                variant="neutral"
                size="xs"
                key={stat.stat.name}
                className="whitespace-nowrap text-sm font-semibold"
              >
                {capitalize(stat.stat.name)}
              </Chip>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-baseline gap-2">
          <span>Types</span>
          {pokemon.types.map((type) => (
            <Chip
              variant="neutral"
              size="xs"
              key={type.type.name}
              className="text-sm font-semibold"
            >
              {capitalize(type.type.name)}
            </Chip>
          ))}
        </div>
        <div className="flex flex-wrap items-baseline gap-2">
          <span>Abilities</span>
          <Abilities abilities={pokemon.abilities} />
        </div>
      </div>
    </div>
  );
}
