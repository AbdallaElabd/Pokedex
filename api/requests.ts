import type { PokeAPI } from "pokeapi-types";

interface PokemonSprites extends PokeAPI.PokemonSprites {
  other: {
    ["official-artwork"]?: {
      front_default?: string;
    };
  };
}

export interface Pokemon extends PokeAPI.Pokemon {
  sprites: PokemonSprites;
}

export type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
};

export async function endpoint<T>(url: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(response.statusText);
  return response.json() as T;
}

export async function getPokemonList() {
  // One time request to get the count of all pokemon
  const { count } = await endpoint<PokemonListResponse>(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1"
  );

  // Get the list of pokemon
  const { results: pokemonList } = (await endpoint(
    `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${count}`
  )) as PokemonListResponse;

  return pokemonList;
}

export async function getAllPokemon() {
  try {
    const pokemonList = await getPokemonList();

    // Get the details of all pokemon
    const pokemonData = new Map<string, Pokemon>();
    const urls = pokemonList.map((pokemon) => pokemon.url);

    const chunkSize = 100000;

    // Split the urls into chunks of 100
    const chunkedUrls: string[][] = Array.from(
      { length: Math.ceil(urls.length / chunkSize) },
      (_, i) => urls.slice(i * chunkSize, i * chunkSize + chunkSize)
    );

    for (let i = 0; i < chunkedUrls.length; i += 1) {
      const chunk = chunkedUrls[i];
      // eslint-disable-next-line no-await-in-loop
      await Promise.all(
        chunk.map(async (url) => {
          const pokemon = await endpoint<Pokemon>(url);
          pokemonData.set(pokemon.name, pokemon);
          return pokemon;
        })
      );
    }
    return pokemonData;
  } catch (error) {
    throw new Error(`Couldn't load pokemon list. Error: ${error}`);
  }
}

export async function getPokemonDetails(pokemonName: string) {
  return endpoint<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
}
