/* eslint-disable @typescript-eslint/no-empty-function */
import { useGetPokemonList } from '@api/queries/use-get-pokemon-list';
import { createContext, PropsWithChildren, useContext } from 'react';

const PokedexContext = createContext<ReturnType<typeof useGetPokemonList>>({
  pokemonList: undefined,
  totalCount: undefined,
  isLoading: false,
  isSuccess: false,
  pageSize: 10,
  offset: 0,
  searchText: '',
  searchBy: 'name',
  sortBy: 'name',
  sortOrder: 'ascending',
  hasNext: false,
  hasPrevious: false,
  changePage: () => {},
  search: () => {},
  changePageSize: () => {},
  setSearchBy: () => {},
  setSortAttribute: () => {},
  toggleSortOrder: () => {},
});

export const usePokedex = () => useContext(PokedexContext);

export function PokedexProvider({ children }: PropsWithChildren) {
  const pokedex = useGetPokemonList();
  return (
    <PokedexContext.Provider value={pokedex}>
      {children}
    </PokedexContext.Provider>
  );
}
