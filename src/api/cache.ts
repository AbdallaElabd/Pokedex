import type { PokeAPI } from 'pokeapi-types';

interface PokemonSprites extends PokeAPI.PokemonSprites {
  other: {
    ['official-artwork']?: {
      front_default?: string;
    };
  };
}

export interface Pokemon extends PokeAPI.Pokemon {
  sprites: PokemonSprites;
}

type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
};

class PokemonCache {
  private allPokemon: Map<string, Pokemon> | null = null;

  static async endpoint<T>(url: string) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(response.statusText);
    return response.json() as T;
  }

  static async loadDataInChunks(
    urls: string[],
    chunkSize: number
  ): Promise<Pokemon[]> {
    const chunkedUrls: string[][] = [];
    for (let i = 0; i < urls.length; i += chunkSize) {
      chunkedUrls.push(urls.slice(i, i + chunkSize));
    }

    const pokemonListDetails: Pokemon[] = [];
    for (let i = 0; i < chunkedUrls.length; i += 1) {
      const chunk = chunkedUrls[i];
      // eslint-disable-next-line no-await-in-loop
      const pokemonDetails = await Promise.all(
        chunk.map((url) => PokemonCache.endpoint<Pokemon>(url))
      );
      pokemonListDetails.push(...pokemonDetails);
    }

    return pokemonListDetails;
  }

  async getAllPokemon() {
    if (this.allPokemon !== null) return this.allPokemon;
    try {
      // One time request to get the count of all pokemon
      const { count } = await PokemonCache.endpoint<PokemonListResponse>(
        'https://pokeapi.co/api/v2/pokemon?offset=0&limit=1'
      );

      // Get the list of pokemon
      const { results: pokemonList } = (await PokemonCache.endpoint(
        `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${count}`
      )) as PokemonListResponse;

      // Get the details of all pokemon
      const pokemonData = new Map<string, Pokemon>();
      const pokemonListDetails = await PokemonCache.loadDataInChunks(
        pokemonList.map((pokemon) => pokemon.url),
        100
      );
      pokemonListDetails.forEach((pokemon) =>
        pokemonData.set(pokemon.name, pokemon)
      );

      // Save the data in the cache
      this.allPokemon = pokemonData;

      return this.allPokemon;
    } catch (error) {
      throw new Error(`Couldn't load pokemon list. Error: ${error}`);
    }
  }

  async getPokemonByName(name: string): Promise<Pokemon | undefined> {
    const allPokemon = await this.getAllPokemon();
    return allPokemon.get(name);
  }
}

export const pokemonCache = new PokemonCache();
