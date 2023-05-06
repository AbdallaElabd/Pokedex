import { Spinner } from '@components/spinner';
import { usePokedex } from '@providers/pokedex';
import { AnimatePresence, motion } from 'framer-motion';

import {
  PaginationButtons,
  PokemonCard,
  SearchInput,
  SortByDropdown,
} from './components';

export function PokemonList() {
  const { pokemonList, isLoading } = usePokedex();

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
            <SearchInput />
            <SortByDropdown />
            <PaginationButtons />
          </div>

          {pokemonList.length === 0 ? (
            <span className="my-16 font-sans text-lg">
              No Pokémon. Try a different search term.
            </span>
          ) : (
            <div className="flex flex-wrap gap-4">
              {pokemonList.map((pokemon) => (
                <PokemonCard key={pokemon.name} pokemon={pokemon} />
              ))}
            </div>
          )}

          {pokemonList.length !== 0 && (
            <div className="place-self-end">
              <PaginationButtons />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
