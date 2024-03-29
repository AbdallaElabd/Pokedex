import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { pokedex } from "@/api/client";
import { Abilities } from "@/components/abilities";
import { Chip } from "@/components/chip";
import { capitalize } from "@/utils/capitalize";
import { formatHeight, formatWeight } from "@/utils/format";
import { getImageInfo } from "@/utils/getImageInfo";

export async function generateStaticParams() {
  const { count } = await pokedex.getPokemonsList();
  const pokemonList = await pokedex
    .getPokemonsList({
      offset: 0,
      limit: count,
    })
    .catch((error: AxiosError) => {
      if (error.response?.status === 404) {
        notFound();
      }
    });

  if (!pokemonList) {
    return notFound();
  }

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

  let pokemon = await pokedex.getPokemonByName(pokemonName).catch((error) => {
    if (error.response?.status === 404) {
      notFound();
    }
  });

  if (!pokemon) {
    return notFound();
  }

  const imageUrl = pokemon.sprites.other?.["official-artwork"]?.front_default;
  let imageInfo: { width: number; height: number; blurDataURL: string } | null =
    null;

  if (imageUrl) {
    imageInfo = await getImageInfo(imageUrl);
  }

  return (
    <div className="relative flex flex-col gap-4 p-8 text-slate-800 md:flex-row">
      <Link href="/">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="absolute left-4 top-4 h-10 w-10 cursor-pointer text-2xl"
        />
      </Link>
      <div className="flex flex-col items-center">
        <span className="text-4xl font-light">{capitalize(pokemon.name)}</span>
        {imageUrl && imageInfo && (
          // eslint-disable-next-line @next/next/no-img-element
          <Image
            width={imageInfo.width}
            height={imageInfo.height}
            className="w-100"
            alt={pokemon.name}
            src={imageUrl}
            placeholder="blur"
            blurDataURL={imageInfo.blurDataURL}
          />
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
