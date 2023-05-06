import { PokemonSearchSchema } from '@api/search-pokemon-schema';
import { Dropdown } from '@components/dropdown';
import {
  faBoltLightning,
  faFont,
  faSearch,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePokedex } from '@providers/pokedex';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef } from 'react';

const SEARCH_BY_ATTRIBUTES = [
  'name',
  'ability',
] satisfies PokemonSearchSchema['searchBy'][];

export function SearchInput() {
  const { searchText, search, searchBy, setSearchBy } = usePokedex();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Dropdown
        renderPlaceholder={(option) => `Search by ${option}`}
        options={SEARCH_BY_ATTRIBUTES}
        selected={searchBy}
        renderOption={(option) => (
          <span className="flex items-center gap-2 text-sm">
            <FontAwesomeIcon
              icon={option === 'ability' ? faBoltLightning : faFont}
            />
            {option}
          </span>
        )}
        onChange={setSearchBy}
      />

      <div className="relative">
        <input
          className="h-9 rounded-md pl-8 pr-8 text-sm outline-none placeholder:text-sm"
          type="text"
          ref={inputRef}
          placeholder={`Search by ${searchBy}...`}
          value={searchText}
          onChange={(event) => search(event.target.value)}
        />
        <div className="pointer-events-none absolute top-0 flex h-full w-8 items-center justify-center px-2 text-sm">
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <AnimatePresence>
          {searchText && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{
                duration: 0.25,
                ease: 'easeInOut',
              }}
              type="button"
              className="absolute right-0 top-0 flex h-full w-8 cursor-pointer items-center justify-center rounded-md text-sm outline-none hover:scale-105 focus:ring-2 focus:ring-inset focus:ring-slate-500"
              onClick={() => {
                search('');
                inputRef.current?.focus();
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
