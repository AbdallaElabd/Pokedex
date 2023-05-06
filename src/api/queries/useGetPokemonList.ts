import { pokemonListRoute, PokemonSearchSchema } from '@router';
import { useNavigate, useSearch } from '@tanstack/router';
import { useCallback } from 'react';
import { useQuery } from 'react-query';

import { pokemonCache } from '../cache';

const defaultPageSize = 10;

export const useGetPokemonList = () => {
  const {
    pageSize = defaultPageSize,
    offset = 0,
    searchText = '',
    searchBy = 'name',
    sortBy = 'name',
    sortOrder = 'ascending',
  } = useSearch({ from: pokemonListRoute.id });

  const navigate = useNavigate({ from: pokemonListRoute.id });

  const { data, isLoading, isSuccess } = useQuery(
    ['pokemonList', pageSize, offset, searchText, searchBy, sortBy, sortOrder],
    async () => {
      const allPokemonList = await pokemonCache.getAllPokemon();

      if (!allPokemonList) return undefined;

      const filteredList = [...allPokemonList]
        .map(([, pokemon]) => pokemon)
        .filter((pokemon) => {
          if (!searchText) return true;
          if (searchBy === 'name') {
            return pokemon.name.includes(searchText.toLowerCase());
          }
          return pokemon.abilities.some((ability) =>
            ability.ability.name.includes(searchText.toLowerCase())
          );
        })
        .sort((p1, p2) => {
          if (sortOrder === 'descending') {
            return p1[sortBy] < p2[sortBy] ? 1 : -1;
          }
          return p2[sortBy] > p1[sortBy] ? -1 : 1;
        });

      const sliced = filteredList.slice(
        offset,
        offset + Number(pageSize) || Number(defaultPageSize)
      );

      return { totalCount: filteredList.length, pokemonList: sliced };
    },
    { keepPreviousData: true }
  );

  const hasPrevious = offset > 0;
  const previous = useCallback(() => {
    if (hasPrevious) {
      const newOffset = offset - (Number(pageSize) || Number(defaultPageSize));
      navigate({ search: { offset: newOffset } });
    }
  }, [hasPrevious, navigate, offset, pageSize]);

  const hasNext = !!(data && data.totalCount > Number(pageSize) + offset);
  const next = useCallback(() => {
    if (hasNext) {
      const newOffset = offset + (Number(pageSize) || Number(defaultPageSize));
      navigate({ search: { offset: newOffset } });
    }
  }, [hasNext, offset, pageSize, navigate]);

  const toggleSortOrder = useCallback(() => {
    navigate({
      search: {
        sortOrder: sortOrder === 'ascending' ? 'descending' : 'ascending',
        offset: 0,
      },
    });
  }, [navigate, sortOrder]);

  const setSearchBy = useCallback(
    (searchByAttribute: PokemonSearchSchema['searchBy']) => {
      navigate({
        search: {
          searchBy: searchByAttribute,
          offset: 0,
        },
      });
    },
    [navigate]
  );

  const setSortAttribute = useCallback(
    (sortByAttribute: PokemonSearchSchema['sortBy']) => {
      navigate({
        search: {
          sortBy: sortByAttribute,
          sortOrder: 'ascending',
          offset: 0,
        },
      });
    },
    [navigate]
  );

  const search = useCallback(
    (text: string) => {
      navigate({
        search: {
          searchText: text,
          offset: 0,
        },
      });
    },
    [navigate]
  );

  const changePageSize = useCallback(
    (newPageSize: PokemonSearchSchema['pageSize']) => {
      navigate({
        search: {
          pageSize: newPageSize,
          offset: 0,
        },
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
    next,
    previous,
    search,
    changePageSize,
    setSearchBy,
    setSortAttribute,
    toggleSortOrder,
  };
};
