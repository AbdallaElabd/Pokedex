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
  if (!response.ok) {
    return {
      success: false,
      error: {
        status: response.status,
        statusText: response.statusText,
      },
    } as const;
  }
  return {
    success: true,
    data: (await response.json()) as T,
  } as const;
}

export async function getPokemonList() {
  // One time request to get the count of all pokemon
  const pokemonListCountResponse = await endpoint<PokemonListResponse>(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1"
  );

  if (!pokemonListCountResponse.success) {
    return pokemonListCountResponse;
  }

  const { count } = pokemonListCountResponse.data;

  // Get the list of pokemon
  const pokemonListResponse = await endpoint<PokemonListResponse>(
    `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${count}`
  );

  return pokemonListResponse;
}

export async function getAllPokemon() {
  const pokemonListResponse = await getPokemonList();

  if (!pokemonListResponse.success) {
    return pokemonListResponse;
  }

  // Get the details of all pokemon
  const pokemonData = new Map<string, Pokemon>();
  const urls = pokemonListResponse.data.results.map((pokemon) => pokemon.url);

  const chunkSize = 100;

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
        const pokemonResponse = await endpoint<Pokemon>(url);
        if (!pokemonResponse.success) {
          throw new Error(
            `Couldn't load pokemon list. Error: ${pokemonResponse.error.statusText}`
          );
        }
        const pokemon = pokemonResponse.data;
        pokemonData.set(pokemon.name, pokemon);
        return pokemon;
      })
    );
  }
  return { success: true, data: pokemonData } as const;
}

export async function getPokemonDetails(pokemonName: string) {
  return endpoint<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
}
