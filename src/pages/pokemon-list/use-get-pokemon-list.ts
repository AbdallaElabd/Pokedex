import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearch } from '@tanstack/router';
import { useCallback } from 'react';

import { pokemonCache } from '../../api/cache';
import { PokemonSearchSchema } from '../../api/search-pokemon-schema';

export const useGetPokemonList = () => {
  const { pageSize, offset, searchText, searchBy, sortBy, sortOrder } =
    useSearch({ from: '/' });

  const navigate = useNavigate({ from: '/' });

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: [
      'getAllPokemon',
      pageSize,
      offset,
      searchText,
      searchBy,
      sortBy,
      sortOrder,
    ],
    queryFn: async () => {
      const allPokemonList = await pokemonCache.getAllPokemon();

      const filteredList = [...allPokemonList]
        .map(([, pokemon]) => pokemon)
        .filter((pokemon) => {
          if (!searchText) return true;
          if (searchBy === 'name') {
            return pokemon.name
              .replaceAll('-', ' ')
              .includes(searchText.toLowerCase());
          }
          return pokemon.abilities.some((ability) =>
            ability.ability.name
              .replaceAll('-', ' ')
              .includes(searchText.toLowerCase())
          );
        })
        .sort((p1, p2) => {
          if (sortOrder === 'descending') {
            return p1[sortBy] < p2[sortBy] ? 1 : -1;
          }
          return p2[sortBy] > p1[sortBy] ? -1 : 1;
        });

      const sliced = filteredList.slice(offset, offset + pageSize);

      return { totalCount: filteredList.length, pokemonList: sliced };
    },
    keepPreviousData: true,
  });

  const hasPrevious = offset > 0;
  const hasNext = !!(data && data.totalCount > Number(pageSize) + offset);
  const changePage = useCallback(
    (direction: 'next' | 'previous') => {
      if (
        (direction === 'previous' && !hasPrevious) ||
        (direction === 'next' && !hasNext)
      ) {
        return;
      }
      const newOffset =
        direction === 'previous' ? offset - pageSize : offset + pageSize;
      navigate({ search: (prev) => ({ ...prev, offset: newOffset }) });
    },
    [hasNext, hasPrevious, navigate, offset, pageSize]
  );

  const toggleSortOrder = useCallback(() => {
    navigate({
      search: (prev) => ({
        ...prev,
        sortOrder: sortOrder === 'ascending' ? 'descending' : 'ascending',
        offset: 0,
      }),
    });
  }, [navigate, sortOrder]);

  const setSearchBy = useCallback(
    (searchByAttribute: PokemonSearchSchema['searchBy']) => {
      navigate({
        search: (prev) => ({
          ...prev,
          searchBy: searchByAttribute,
          offset: 0,
        }),
      });
    },
    [navigate]
  );

  const setSortAttribute = useCallback(
    (sortByAttribute: PokemonSearchSchema['sortBy']) => {
      navigate({
        search: (prev) => ({
          ...prev,
          sortBy: sortByAttribute,
          sortOrder: 'ascending',
          offset: 0,
        }),
      });
    },
    [navigate]
  );

  const search = useCallback(
    (text: string) => {
      navigate({
        search: (prev) => ({
          ...prev,
          searchText: text,
          offset: 0,
        }),
      });
    },
    [navigate]
  );

  const changePageSize = useCallback(
    (newPageSize: PokemonSearchSchema['pageSize']) => {
      navigate({
        search: (prev) => ({
          ...prev,
          pageSize: newPageSize,
          offset: 0,
        }),
      });
    },
    [navigate]
  );

  return {
    pokemonList: data?.pokemonList,
    totalCount: data?.totalCount,
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
    changePage,
    search,
    changePageSize,
    setSearchBy,
    setSortAttribute,
    toggleSortOrder,
  };
};
