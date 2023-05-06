import { pokemonCache } from '@api/cache';
import { Abilities } from '@components/abilities';
import { Chip } from '@components/chip';
import { Spinner } from '@components/spinner';
import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/router';
import { capitalize, formatHeight, formatWeight } from '@utils';

export function PokemonDetails() {
  const { pokemonName } = useParams({ from: '/pokemon/$pokemonName' });

  const { isLoading, data: pokemon } = useQuery({
    queryKey: ['getPokemonByName', pokemonName],
    queryFn: () => pokemonCache.getPokemonByName(pokemonName),
  });

  if (isLoading || !pokemon) return <Spinner />;

  return (
    <div className="flex flex-col gap-4 p-8 md:flex-row">
      <div className="flex flex-col items-center gap-2">
        <span className="text-4xl font-light">{capitalize(pokemon.name)}</span>

        <img
          className="w-2/3 min-w-[200px]"
          alt={pokemon.name}
          src={pokemon.sprites.other['official-artwork']?.front_default}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span>{`Height: ${formatHeight(pokemon.height)}`}</span>
        <span>{`Weight: ${formatWeight(pokemon.weight)}`}</span>
        <span>{`Base experience: ${pokemon.base_experience}`}</span>
        <div className="flex flex-col gap-2">
          <span>Stats</span>
          <div className="flex flex-wrap items-center gap-2">
            {pokemon.stats.map((stat) => (
              <Chip
                key={stat.stat.name}
                className="whitespace-nowrap text-sm font-semibold"
              >
                {capitalize(stat.stat.name)}
              </Chip>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span>Types</span>
          {pokemon.types.map((type) => (
            <Chip key={type.type.name} className="text-sm font-semibold">
              {capitalize(type.type.name)}
            </Chip>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <span>Abilities</span>
          <Abilities abilities={pokemon.abilities} />
        </div>
      </div>
    </div>
  );
}
