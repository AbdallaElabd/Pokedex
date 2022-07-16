import { API_URL, endpoint } from "./api";

export type Pokemon = {
  id: string;
  name: string;
  weight: number;
  height: number;
  image: string;
  abilities: string[];
};

type PokemonListReponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
};

class PokemonCache {
  private allPokemon: Map<string, Pokemon> | null = null;

  async getAllPokemon() {
    if (this.allPokemon !== null) return this.allPokemon;
    try {
      const { results: pokemonList } = await endpoint<PokemonListReponse>(
        `${API_URL}/pokemon?offset=0&limit=1500`
      );

      const pokemonData = new Map<string, Pokemon>();

      const pokemonListDetails: Pokemon[] = await Promise.all(
        pokemonList.map(({ url }) =>
          endpoint(url).then((pokemonData: any) => ({
            id: pokemonData.id,
            name: pokemonData.name,
            height: pokemonData.height,
            weight: pokemonData.weight,
            image: pokemonData.sprites?.other?.official_artwork?.front_default,
            abilities: (pokemonData.abilities ?? []).map(
              (ability: any) => ability?.ability?.name
            ),
          }))
        )
      );

      pokemonListDetails.forEach((pokemon) =>
        pokemonData.set(pokemon.name, pokemon)
      );
      this.allPokemon = pokemonData;
      return this.allPokemon;
    } catch (error) {
      console.error("Couldn't load pokemon list.");
    }
  }

  async getPokemonByName(name: string): Promise<Pokemon | undefined> {
    const allPokemon = await this.getAllPokemon();
    return allPokemon?.get(name);
  }
}

export const pokemonCache = new PokemonCache();
