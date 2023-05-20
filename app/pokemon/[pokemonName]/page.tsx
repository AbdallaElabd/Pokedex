import { getPokemonList, getPokemonDetails, Pokemon } from "@/api/requests";
import { Abilities } from "@/components/abilities";
import { Chip } from "@/components/chip";
import { capitalize } from "@/utils/capitalize";
import { formatHeight, formatWeight } from "@/utils/format";
import {
  faArrowLeft,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const pokemonListResponse = await getPokemonList();

  if (!pokemonListResponse.success) {
    throw new Error(
      "Error while fetching pokemon list: " + pokemonListResponse.error
    );
  }

  const { data: pokemonList } = pokemonListResponse;

  return pokemonList.results.map(({ name }) => ({
    params: { pokemonName: name },
  }));
}

export default async function PokemonDetails({
  params,
}: {
  params: { pokemonName: string };
}) {
  const { pokemonName } = params;

  const pokemonDetails = await getPokemonDetails(pokemonName);

  if (!pokemonDetails.success) {
    return notFound();
  }

  const { data: pokemon } = pokemonDetails;

  const image = pokemon.sprites.other["official-artwork"]?.front_default;

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
        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="w-2/3 min-w-[200px]" alt={pokemon.name} src={image} />
        )}
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
