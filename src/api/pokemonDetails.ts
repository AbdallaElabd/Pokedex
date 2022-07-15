import { useQuery } from "react-query";
import { API_URL, endpoint } from "./api";

type PokemonAbility = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

export type GetPokemonDetails = {
  id: string;
  name: string;
  weight: number;
  height: number;
  image: string;
  abilities: PokemonAbility[];
};

export const getPokemonDetails = (pokemonName: string) => {
  return endpoint<GetPokemonDetails>(`${API_URL}/pokemon/${pokemonName}`);
};

export const useGetPokemonDetails = (pokemonName: string | undefined) => {
  if (!pokemonName) throw new Error("Pokemon name not provided");

  return useQuery(["pokemonName", pokemonName], () =>
    getPokemonDetails(pokemonName)
  );
};
