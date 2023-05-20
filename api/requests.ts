import { Pokemon, PokemonClient } from "pokenode-ts";

const pokemonClient = new PokemonClient({
  cacheOptions: {
    ttl: 24 * 60 * 60 * 1000, // 24 hours
  },
});

export async function getPokemonList() {
  // One time request to get the count of all pokemon
  const response = await pokemonClient.listPokemons(0, 1);
  return pokemonClient.listPokemons(0, response.count);
}

export async function getAllPokemon() {
  const { results: pokemonList } = await getPokemonList();

  const allPokemon: Pokemon[] = [];

  const pokemonNames = pokemonList.map((pokemon) => pokemon.name);

  const chunkSize = 100;

  // Split the requests into chunks of 100
  const chunks: string[][] = Array.from(
    { length: Math.ceil(pokemonNames.length / chunkSize) },
    (_, i) => pokemonNames.slice(i * chunkSize, i * chunkSize + chunkSize)
  );
  for (let i = 0; i < chunks.length; i += 1) {
    console.log(`Requesting chunk ${i + 1} of ${chunks.length}`);
    const chunk = chunks[i];
    // eslint-disable-next-line no-await-in-loop
    await Promise.all(
      chunk.map(async (pokemonName) => {
        const pokemon = await pokemonClient.getPokemonByName(pokemonName);
        allPokemon.push(pokemon);
        return pokemon;
      })
    );
  }
  return allPokemon;
}

export function getPokemonByName(name: string) {
  return pokemonClient.getPokemonByName(name);
}
