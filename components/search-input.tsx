"use client";

import {
  faBoltLightning,
  faFont,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";

import {
  PokemonSearchSchema,
  updatePokemonSearchParams,
} from "@/api/search-pokemon-schema";
import { Dropdown } from "@/components/dropdown";

const SEARCH_BY_ATTRIBUTES = [
  "name",
  "ability",
] satisfies PokemonSearchSchema["searchBy"][];

type SearchInputProps = {
  searchText: string;
  searchBy: PokemonSearchSchema["searchBy"];
  searchParams: URLSearchParams;
};

export function SearchInput({
  searchText,
  searchBy,
  searchParams,
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [immediateSearchText, setImmediateSearchText] = useState(searchText);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTypingRef = useRef(false);

  const router = useRouter();

  const search = useCallback(
    (searchQuery: string) => {
      const newUrl = updatePokemonSearchParams(searchParams, [
        ["searchText", searchQuery],
        ["offset", "0"],
      ]);
      router.replace(`?${newUrl}`);
    },
    [router, searchParams]
  );

  const debouncedSearch = useCallback(
    (value: string) => {
      isTypingRef.current = true;
      setImmediateSearchText(value);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        isTypingRef.current = false;
        search(value);
      }, 500);
    },
    [search]
  );

  if (!isTypingRef.current && immediateSearchText !== searchText) {
    setImmediateSearchText(searchText);
  }

  return (
    <>
      <Dropdown
        renderPlaceholder={(option) => `Search by ${option}`}
        options={SEARCH_BY_ATTRIBUTES}
        selected={searchBy}
        renderOption={(option, selected) => (
          <span className="flex items-center gap-2 text-sm">
            <FontAwesomeIcon
              icon={option === "ability" ? faBoltLightning : faFont}
            />
            {option}
          </span>
        )}
        onChange={(searchBy) => {
          const newUrl = updatePokemonSearchParams(searchParams, [
            ["searchBy", searchBy],
            ["offset", "0"],
          ]);
          router.replace(`?${newUrl}`);
        }}
      />

      <div className="relative">
        <input
          className="h-9 rounded-md pl-8 pr-8 text-sm text-slate-900 outline-none placeholder:text-sm"
          type="text"
          ref={inputRef}
          placeholder={`Search by ${searchBy}...`}
          value={immediateSearchText}
          onChange={(event) => {
            debouncedSearch(event.target.value);
          }}
        />
        <div className="pointer-events-none absolute top-0 flex h-full w-8 items-center justify-center px-2 text-sm">
          <FontAwesomeIcon icon={faSearch} className="h-3 w-3 text-slate-900" />
        </div>
        <AnimatePresence>
          {searchText && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{
                duration: 0.25,
                ease: "easeInOut",
              }}
              type="button"
              className="absolute right-0 top-0 flex h-full w-8 cursor-pointer items-center justify-center rounded-md text-sm outline-none hover:scale-105 focus:ring-2 focus:ring-inset focus:ring-slate-500"
              onClick={() => {
                setImmediateSearchText("");
                search("");
                inputRef.current?.focus();
              }}
            >
              <FontAwesomeIcon
                icon={faTimes}
                className="h-4 w-4 text-slate-900"
              />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
