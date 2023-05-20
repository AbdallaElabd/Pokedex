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

type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
};

type ProgressEvent = {
  loaded: number;
  total: number;
};

class PokemonCache {
  private allPokemon: Map<string, Pokemon> | null = null;

  static async endpoint<T>(url: string) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(response.statusText);
    return response.json() as T;
  }

  private eventListeners: ((progress: ProgressEvent) => void)[] = [];

  addEventListener(callback: (progress: ProgressEvent) => void) {
    this.eventListeners.push(callback);
    const unsubscribe = () => {
      this.eventListeners = this.eventListeners.filter(
        (listener) => listener !== callback
      );
    };
    return unsubscribe;
  }

  private broadcastProgress(progress: ProgressEvent) {
    this.eventListeners.forEach((listener) => listener(progress));
  }

  async getAllPokemon() {
    if (this.allPokemon !== null) return this.allPokemon;
    try {
      // One time request to get the count of all pokemon
      const { count } = await PokemonCache.endpoint<PokemonListResponse>(
        "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1"
      );

      this.broadcastProgress({ loaded: 0, total: count });

      // Get the list of pokemon
      const { results: pokemonList } = (await PokemonCache.endpoint(
        `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${count}`
      )) as PokemonListResponse;

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
            const pokemon = await PokemonCache.endpoint<Pokemon>(url);
            pokemonData.set(pokemon.name, pokemon);
            this.broadcastProgress({ loaded: pokemonData.size, total: count });
            return pokemon;
          })
        );
      }

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
