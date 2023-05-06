import { PokemonSearchSchema } from '@api/queries/search-pokemon-schema';
import { Dropdown } from '@components/dropdown';
import {
  faBoltLightning,
  faFont,
  faSearch,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePokedex } from '@providers/pokedex';
import { motion } from 'framer-motion';
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
        toggler={
          <div className="flex items-center gap-2">
            <span>{`Search by ${searchBy}`}</span>
            <FontAwesomeIcon
              icon={searchBy === 'ability' ? faBoltLightning : faFont}
            />
          </div>
        }
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
        onOptionClicked={setSearchBy}
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
        <motion.button
          animate={{ scale: searchText ? 1 : 0 }}
          initial={false}
          type="button"
          className="absolute right-0 top-0 flex h-full w-8 cursor-pointer items-center justify-center text-sm hover:scale-105"
          onClick={() => {
            search('');
            inputRef.current?.focus();
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </motion.button>
      </div>
    </>
  );
}
