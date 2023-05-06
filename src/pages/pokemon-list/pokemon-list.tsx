import { Button } from '@components/button';
import { Spinner } from '@components/spinner';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    clearFilters,
  } = useGetPokemonList();

  return (
    <AnimatePresence mode="wait">
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
          className="flex flex-col gap-4 p-4"
        >
          <div className="flex flex-wrap items-center justify-end gap-4">
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
            <Button variant="primary" onClick={clearFilters}>
              <FontAwesomeIcon icon={faTrashCan} />
            </Button>
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
          <div className="flex h-full flex-grow justify-center">
            <AnimatePresence mode="popLayout">
              {pokemonList.length === 0 ? (
                <motion.span
                  key="empty"
                  className="my-8 font-sans text-lg"
                  initial={{ opacity: 0, translateY: 50 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  exit={{ opacity: 0, translateY: 50 }}
                >
                  No Pokémon found.
                </motion.span>
              ) : (
                <motion.div className="grid h-full w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {pokemonList.map((pokemon) => (
                    <motion.div
                      key={pokemon.id}
                      layout="position"
                      initial={{ opacity: 0, translateY: 50 }}
                      animate={{ opacity: 1, translateY: 0 }}
                      exit={{ opacity: 0, translateY: 50 }}
                      layoutId={`${pokemon.id}`}
                    >
                      <PokemonCard
                        pokemon={pokemon}
                        searchBy={searchBy}
                        searchText={searchText}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
