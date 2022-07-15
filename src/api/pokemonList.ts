import { useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { API_URL, endpoint } from "./api";
import { GetPokemonDetails } from "./pokemonDetails";

type TPaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

type GetPokemonListPartialData = TPaginatedResponse<{
  name: string;
  url: string;
}>;
type GetPokemonListData = TPaginatedResponse<GetPokemonDetails>;

export const getPokemonList = async (
  url?: string
): Promise<GetPokemonListData> => {
  const pokemonList = await (url
    ? endpoint<GetPokemonListPartialData>(url)
    : endpoint<GetPokemonListPartialData>(`${API_URL}/pokemon`));

  const pokemonDetailsData = await Promise.all(
    pokemonList.results.map(({ url }) => endpoint<GetPokemonDetails>(url))
  );

  const list = pokemonList.results.map(
    (pokemon) =>
      pokemonDetailsData.find(
        ({ name }) => pokemon.name === name
        // TODO: fix casting
      ) as GetPokemonDetails
  );

  return {
    ...pokemonList,
    results: list,
  };
};

export const useGetPokemonList = () => {
  const [page, setPage] = useState<string>("");

  const { data, isLoading, isSuccess } = useQuery(
    ["pokemonList", page],
    () => getPokemonList(page),
    {
      keepPreviousData: true,
    }
  );

  const previousPage = useMemo(
    () =>
      // TODO: fix casting
      !data?.previous ? undefined : () => setPage(data.previous as string),
    [data?.previous]
  );
  const nextPage = useMemo(
    // TODO: fix casting
    () => (!data?.next ? undefined : () => setPage(data.next as string)),
    [data?.previous]
  );

  return {
    pokemonList: data?.results,
    isLoading,
    isSuccess,
    previousPage,
    nextPage,
  };
};
