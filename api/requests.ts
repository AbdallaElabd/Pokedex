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
    throw new Error(
      `Couldn't load pokemon list. Error: ${pokemonListCountResponse.error?.statusText}`
    );
  }

  const { count } = pokemonListCountResponse.data;

  // Get the list of pokemon
  const pokemonListResponse = await endpoint<PokemonListResponse>(
    `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${count}`
  );

  if (!pokemonListResponse.success) {
    throw new Error(
      `Couldn't load pokemon list. Error: ${pokemonListResponse.error?.statusText}`
    );
  }

  return pokemonListResponse.data.results;
}

export async function getAllPokemon() {
  try {
    const pokemonList = await getPokemonList();

    // Get the details of all pokemon
    const pokemonData = new Map<string, Pokemon>();
    const urls = pokemonList.map((pokemon) => pokemon.url);

    const chunkSize = 100;

    // throw new Error("here fails");

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
    return pokemonData;
  } catch (error) {
    throw new Error(`Couldn't load pokemon list. Error: ${error}`);
  }
}

export async function getPokemonDetails(pokemonName: string) {
  return endpoint<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
}
