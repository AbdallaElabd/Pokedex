import { useQueryParam } from '@hooks/useQueryParam';
import { useCallback } from 'react';
import { useQuery } from 'react-query';

import { pokemonCache } from '../cache';

export type PageSize = '10' | '20' | '50';
const defaultPageSize: PageSize = '10';
export type SearchByAttribute = 'name' | 'ability';
export type SortByAttribute = 'name' | 'height' | 'weight';
export type SortOrder = 'ascending' | 'descending';

type GetPokemonListParams = {
  pageSize: PageSize;
  offset: number;
  searchText: string;
  searchBy: SearchByAttribute;
  sortBy: SortByAttribute;
  sortOrder: SortOrder;
};

const getPokemonListQuery = async ({
  pageSize,
  offset,
  searchText,
  searchBy,
  sortBy,
  sortOrder,
}: GetPokemonListParams) => {
  const allPokemonList = await pokemonCache.getAllPokemon();

  if (!allPokemonList) return undefined;

  const filteredList = [...allPokemonList]
    .map(([, pokemon]) => pokemon)
    .filter((pokemon) => {
      if (!searchText) return true;
      if (searchBy === 'name') {
        return pokemon.name.includes(searchText.toLowerCase());
      }
      return pokemon.abilities.some(
        (ability) => ability.ability.name.includes(searchText.toLowerCase()),
      );
    })
    .sort((p1, p2) => {
      if (sortOrder === 'descending') {
        return p1[sortBy] < p2[sortBy] ? 1 : -1;
      }
      return p2[sortBy] > p1[sortBy] ? -1 : 1;
    });

  const sliced = filteredList.slice(offset, offset + Number(pageSize) || Number(defaultPageSize));

  return { totalCount: filteredList.length, pokemonList: sliced };
};

export const useGetPokemonList = () => {
  const [pageSize, setPageSize] = useQueryParam<PageSize>('string', 'pageSize', defaultPageSize);
  const [offset, setOffset] = useQueryParam<number>('number', 'offset', 0);
  const [searchText, setSearchText] = useQueryParam<string>('string', 'searchText', '');
  const [searchBy, setSearchBy] = useQueryParam<SearchByAttribute>(
    'string',
    'searchBy',
    'name',
  );
  const [sortBy, setSortBy] = useQueryParam<SortByAttribute>('string', 'sortBy', 'name');
  const [sortOrder, setSortOrder] = useQueryParam<SortOrder>(
    'string',
    'sortOrder',
    'ascending',
  );

  const { data, isLoading, isSuccess } = useQuery(
    ['pokemonList', pageSize, offset, searchText, searchBy, sortBy, sortOrder],
    () => getPokemonListQuery({
      pageSize,
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
      setOffset(offset - (Number(pageSize) || Number(defaultPageSize)));
    }
  }, [hasPrevious, setOffset, offset, pageSize]);

  const hasNext = !!(data && data.totalCount > (Number(pageSize) + offset));
  const next = useCallback(() => {
    if (hasNext) {
      setOffset(offset + (Number(pageSize) || Number(defaultPageSize)));
    }
  }, [hasNext, pageSize, offset, setOffset]);

  const toggleSortOrder = useCallback(() => {
    setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending');
    setOffset(0);
  }, [setOffset, setSortOrder, sortOrder]);

  const setSortAttribute = useCallback(
    (sortByAttribute: SortByAttribute) => {
      setSortBy(sortByAttribute);
      setSortOrder('ascending');
      setOffset(0);
    },
    [setOffset, setSortBy, setSortOrder],
  );

  const search = useCallback(
    (text: string) => {
      setSearchText(text);
      setOffset(0);
    },
    [setOffset, setSearchText],
  );

  const changePageSize = useCallback(
    (newPageSize: PageSize) => {
      setPageSize(newPageSize);
      setOffset(0);
    },
    [setPageSize, setOffset],
  );

  return {
    pokemonList: data?.pokemonList,
    isLoading,
    isSuccess,
    pageSize,
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
    changePageSize,
    setSearchBy,
    setSortAttribute,
    toggleSortOrder,
  };
};
