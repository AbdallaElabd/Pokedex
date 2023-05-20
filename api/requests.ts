import { setupCache } from "axios-cache-interceptor";
import { Pokemon, PokemonClient } from "pokenode-ts";

const pokemonClient = new PokemonClient({
  logs: true,
});

export async function getPokemonList() {
  // One time request to get the count of all pokemon
  const response = await pokemonClient.listPokemons(0, 1);
  return pokemonClient.listPokemons(0, response.count);
}

export async function getAllPokemon() {
  const { results: pokemonList } = await getPokemonList();

  const pokemonData = new Map<string, Pokemon>();

  // Get the details of all pokemon
  const allPokemonDetails = await Promise.all(
    pokemonList.map((pokemon) => pokemonClient.getPokemonByName(pokemon.name))
  );

  allPokemonDetails.forEach((pokemon) => {
    pokemonData.set(pokemon.name, pokemon);
  });

  return pokemonData;
}

export async function getPokemonByName(name: string) {
  return pokemonClient.getPokemonByName(name);
}
