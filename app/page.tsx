import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button } from "@/components/button";

import { SearchInput } from "@/components/search-input";
import { SortByDropdown } from "@/components/sort-by-dropdown";
import { PaginationButtons } from "@/app/pagination-buttons";
import { PokemonCard } from "@/components/pokemon-card";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

import {
  pokemonSearchSchema,
  updatePokemonSearchParams,
} from "@/api/search-pokemon-schema";
import Link from "next/link";
import { getAllPokemon } from "@/api/requests";

export default async function Home({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  const { sortBy, sortOrder, searchText, searchBy, offset, pageSize } =
    pokemonSearchSchema.parse(searchParams);

  const filteredList = Array.from(await getAllPokemon())
    .map(([, pokemon]) => pokemon)
    .filter((pokemon) => {
      if (!searchText) return true;
      if (searchBy === "name") {
        return pokemon.name
          .replaceAll("-", " ")
          .includes(searchText.toLowerCase());
      }
      return pokemon.abilities.some((ability) =>
        ability.ability.name
          .replaceAll("-", " ")
          .includes(searchText.toLowerCase())
      );
    })
    .sort((p1, p2) => {
      if (sortOrder === "descending") {
        return p1[sortBy] < p2[sortBy] ? 1 : -1;
      }
      return p2[sortBy] > p1[sortBy] ? -1 : 1;
    });

  const pokemonList = filteredList.slice(offset, offset + pageSize);
  const totalCount = filteredList.length;

  const hasNext = offset + pageSize < filteredList.length;
  const hasPrevious = offset > 0;
  const nextPageUrl = hasNext
    ? updatePokemonSearchParams(searchParams, [
        ["offset", `${offset + pageSize}`],
      ])
    : undefined;
  const previousPageUrl = hasPrevious
    ? updatePokemonSearchParams(searchParams, [
        ["offset", `${offset - pageSize}`],
      ])
    : undefined;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-end gap-4">
        <SearchInput
          searchParams={searchParams}
          searchText={searchText}
          searchBy={searchBy}
        />
        <SortByDropdown
          sortBy={sortBy}
          sortOrder={sortOrder}
          searchParams={searchParams}
        />
        <Link href="/">
          <Button variant="primary">
            <FontAwesomeIcon icon={faTrashCan} className="h-4 w-4" />
          </Button>
        </Link>
        <PaginationButtons
          searchParams={searchParams}
          totalCount={totalCount}
          hasPrevious={hasPrevious}
          hasNext={hasNext}
          nextPageUrl={nextPageUrl}
          previousPageUrl={previousPageUrl}
          offset={offset}
          pageSize={pageSize}
        />
      </div>
      <div className="flex h-full flex-grow justify-center">
        {pokemonList.length === 0 ? (
          <span key="empty">No Pokémon found.</span>
        ) : (
          <div className="grid h-full w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pokemonList.map((pokemon) => (
              <div key={pokemon.id}>
                <PokemonCard
                  pokemon={pokemon}
                  searchBy={searchBy}
                  searchText={searchText}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      {pokemonList.length !== 0 && (
        <PaginationButtons
          searchParams={searchParams}
          totalCount={totalCount}
          hasPrevious={hasPrevious}
          hasNext={hasNext}
          nextPageUrl={nextPageUrl}
          previousPageUrl={previousPageUrl}
          offset={offset}
          pageSize={pageSize}
        />
      )}
    </div>
  );
}
