import { Spinner } from '@components/spinner';
import { useGetPokemonList } from '@pages/pokemon-list/use-get-pokemon-list';
import { AnimatePresence, motion } from 'framer-motion';

import {
  PaginationButtons,
  PokemonCard,
  SearchInput,
  SortByDropdown,
} from './components';

export function PokemonList() {
  const {
    pokemonList,
    isLoading,
    sortBy,
    setSortAttribute,
    sortOrder,
    toggleSortOrder,
    searchText,
    search,
    searchBy,
    setSearchBy,
    totalCount,
    hasPrevious,
    hasNext,
    changePage,
    offset,
    pageSize,
    changePageSize,
  } = useGetPokemonList();

  return (
    <AnimatePresence>
      {isLoading || !pokemonList ? (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Spinner />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            delay: 0.2,
          }}
          className="flex flex-col gap-4 p-8"
        >
          <div className="flex items-center justify-end gap-4">
            <SearchInput
              searchText={searchText}
              search={search}
              searchBy={searchBy}
              setSearchBy={setSearchBy}
            />
            <SortByDropdown
              sortBy={sortBy}
              setSortAttribute={setSortAttribute}
              sortOrder={sortOrder}
              toggleSortOrder={toggleSortOrder}
            />
            <PaginationButtons
              totalCount={totalCount}
              hasPrevious={hasPrevious}
              hasNext={hasNext}
              changePage={changePage}
              offset={offset}
              pageSize={pageSize}
              changePageSize={changePageSize}
            />
          </div>

          {pokemonList.length === 0 ? (
            <span className="my-16 font-sans text-lg">
              No Pokémon. Try a different search term.
            </span>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {pokemonList.map((pokemon) => (
                <PokemonCard
                  key={pokemon.name}
                  pokemon={pokemon}
                  searchBy={searchBy}
                  searchText={searchText}
                />
              ))}
            </div>
          )}

          {pokemonList.length !== 0 && (
            <div className="place-self-end">
              <PaginationButtons
                totalCount={totalCount}
                hasPrevious={hasPrevious}
                hasNext={hasNext}
                changePage={changePage}
                offset={offset}
                pageSize={pageSize}
                changePageSize={changePageSize}
              />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
