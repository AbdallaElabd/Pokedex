import { useQuery } from "react-query";
import { pokemonCache } from "../cache";

const getPokemonDetailsQuery = async (name: string) => {
  const data = await pokemonCache.getAllPokemon();
  return data?.get(name);
};

export const useGetPokemonDetails = (name: string) => {
  const {
    data: pokemonDetails,
    isLoading,
    isSuccess,
  } = useQuery(["pokemonDetails", name], () => getPokemonDetailsQuery(name));

  return {
    pokemonDetails,
    isLoading,
    isSuccess,
  };
};
