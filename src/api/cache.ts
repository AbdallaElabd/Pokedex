// eslint-disable-next-line import/no-extraneous-dependencies
import { type PokeAPI } from 'pokeapi-types';

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

type PokemonListReponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
};

class PokemonCache {
  private allPokemon: Map<string, Pokemon> | null = null;

  static async endpoint(url: string) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  }

  async getAllPokemon() {
    if (this.allPokemon !== null) return this.allPokemon;
    try {
      const { results: pokemonList } = (await PokemonCache.endpoint(
        'https://pokeapi.co/api/v2/pokemon?offset=0&limit=1500'
      )) as PokemonListReponse;

      const pokemonData = new Map<string, Pokemon>();

      const pokemonListDetails: Pokemon[] = await Promise.all(
        pokemonList.map(({ url }) => PokemonCache.endpoint(url))
      );

      pokemonListDetails.forEach((pokemon) =>
        pokemonData.set(pokemon.name, pokemon)
      );
      this.allPokemon = pokemonData;
      return this.allPokemon;
    } catch (error) {
      throw new Error(`Couldn't load pokemon list. Error: ${error}`);
    }
  }

  async getPokemonByName(name: string): Promise<Pokemon | undefined> {
    const allPokemon = await this.getAllPokemon();
    return allPokemon?.get(name);
  }
}

export const pokemonCache = new PokemonCache();
