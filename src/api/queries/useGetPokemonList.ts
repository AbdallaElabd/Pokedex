import { useQueryParam } from '@hooks/useQueryParam';
import { useCallback, useState } from 'react';
import { useQuery } from 'react-query';

import { pokemonCache } from '../cache';

type Limit = '10' | '20' | '50';
const defaultLimit: Limit = '10';
type SearchByAttribute = 'name' | 'ability';
export type SortByAttribute = 'name' | 'height' | 'weight';
export type SortOrder = 'ascending' | 'descending';

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
    .map(([, pokemon]) => pokemon)
    .filter((pokemon) => {
      if (!searchText) return true;
      if (searchBy === 'name') {
        return pokemon.name.includes(searchText.toLowerCase());
      }
      return pokemon.abilities.some((ability) => ability.includes(searchText.toLowerCase()));
    })
    .sort((p1, p2) => {
      if (sortOrder === 'descending') {
        return p1[sortBy] < p2[sortBy] ? 1 : -1;
      }
      return p2[sortBy] > p1[sortBy] ? -1 : 1;
    })
    .slice(offset, offset + Number(limit) || Number(defaultLimit));

  return { totalCount: allPokemonList.size, pokemonList };
};

export const useGetPokemonList = () => {
  const [limit, setLimit] = useQueryParam<Limit>('limit', defaultLimit);
  const [offset, setOffset] = useState<number>(0);
  const [searchText, setSearchText] = useQueryParam<string>('searchText', '');
  const [searchBy, setSearchBy] = useQueryParam<SearchByAttribute>(
    'searchBy',
    'name',
  );
  const [sortBy, setSortBy] = useQueryParam<SortByAttribute>('sortBy', 'name');
  const [sortOrder, setSortOrder] = useQueryParam<SortOrder>(
    'sortOrder',
    'ascending',
  );

  const { data, isLoading, isSuccess } = useQuery(
    ['pokemonList', limit, offset, searchText, searchBy, sortBy, sortOrder],
    () => getPokemonListQuery({
      limit,
      offset,
      searchText,
      searchBy,
      sortBy,
      sortOrder,
    }),
    { keepPreviousData: true },
  );

  const hasPrevious = offset > 0;
  const previous = useCallback(() => {
    if (hasPrevious) {
      setOffset(offset - (Number(limit) || Number(defaultLimit)));
    }
  }, [hasPrevious, offset, limit]);

  const hasNext = !!(data && data.pokemonList.length > offset);
  const next = useCallback(() => {
    if (hasNext) {
      setOffset(offset + (Number(limit) || Number(defaultLimit)));
    }
  }, [hasNext, limit, offset]);

  const toggleSortOrder = useCallback(() => {
    setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending');
    setOffset(0);
  }, [setSortOrder, sortOrder]);

  const setSortAttribute = useCallback(
    (sortByAttribute: SortByAttribute) => {
      setSortBy(sortByAttribute);
      setSortOrder('ascending');
      setOffset(0);
    },
    [setSortBy, setSortOrder],
  );

  const search = useCallback(
    (text: string) => {
      setSearchText(text);
      setOffset(0);
    },
    [setSearchText],
  );

  const setPageSize = useCallback(
    (newLimit: Limit) => {
      setLimit(newLimit);
      setOffset(0);
    },
    [setLimit],
  );

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
    search,
    setPageSize,
    setSearchBy,
    setSortAttribute,
    toggleSortOrder,
  };
};
