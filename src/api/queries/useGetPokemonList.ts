import { useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { pokemonCache } from "../cache";

type Limit = 10 | 20 | 50;
type SearchByAttribute = "name" | "ability";
export type SortByAttribute = "name" | "height" | "weight";
export type SortOrder = "ascending" | "descending";

type GetPokemonListParams = {
  limit: Limit;
  offset: number;
  searchText: string;
  searchBy: SearchByAttribute;
  sortBy: SortByAttribute;
  sortOrder: SortOrder;
};

const getPokemonListQuery = async ({
  limit,
  offset,
  searchText,
  searchBy,
  sortBy,
  sortOrder,
}: GetPokemonListParams) => {
  const allPokemonList = await pokemonCache.getAllPokemon();

  if (!allPokemonList) return undefined;

  const pokemonList = [...allPokemonList]
    .map(([_name, pokemon]) => pokemon)
    .filter((pokemon) => {
      if (!searchText) return true;
      if (searchBy === "name")
        return pokemon.name.includes(searchText.toLowerCase());
      return pokemon.abilities.some((ability) =>
        ability.includes(searchText.toLowerCase())
      );
    })
    .sort((p1, p2) => {
      return sortOrder === "descending"
        ? p1[sortBy] < p2[sortBy]
          ? -1
          : 1
        : p2[sortBy] > p1[sortBy]
        ? 1
        : -1;
    })
    .slice(offset, offset + limit);

  return { totalCount: allPokemonList.size, pokemonList };
};

export const useGetPokemonList = () => {
  const [limit, setLimit] = useState<Limit>(10);
  const [offset, setOffset] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>("");
  const [searchBy, setSearchBy] = useState<SearchByAttribute>("name");
  const [sortBy, setSortBy] = useState<SortByAttribute>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("ascending");

  const { data, isLoading, isSuccess } = useQuery(
    ["pokemonList", limit, offset, searchText, searchBy, sortBy, sortOrder],
    () =>
      getPokemonListQuery({
        limit,
        offset,
        searchText,
        searchBy,
        sortBy,
        sortOrder,
      }),
    {
      keepPreviousData: true,
    }
  );

  const hasPrevious = offset > 0;
  const previous = useCallback(() => {
    if (hasPrevious) {
      setOffset((currentOffset) => currentOffset - limit);
    }
  }, [hasPrevious, limit]);

  const hasNext = data && data.totalCount > offset ? true : false;
  const next = useCallback(() => {
    if (hasNext) {
      setOffset((currentOffset) => currentOffset + limit);
    }
  }, [hasNext, limit]);

  const toggleSortOrder = useCallback(() => {
    setSortOrder((currentOrder) =>
      currentOrder === "ascending" ? "descending" : "ascending"
    );
    setOffset(0);
  }, []);

  return {
    pokemonList: data?.pokemonList,
    isLoading,
    isSuccess,
    limit,
    offset,
    searchText,
    searchBy,
    sortBy,
    sortOrder,
    hasNext,
    hasPrevious,
    next,
    previous,
    setLimit,
    setSearchText,
    setSearchBy,
    setSortBy,
    toggleSortOrder,
  };
};
