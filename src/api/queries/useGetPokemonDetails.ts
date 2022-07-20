import { useQuery } from "react-query";

import { pokemonCache } from "../cache";

const getPokemonDetailsQuery = (name: string | undefined) => {
  if (!name) return undefined;
  return pokemonCache.getPokemonByName(name);
};

export const useGetPokemonDetails = (name: string | undefined) => {
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
