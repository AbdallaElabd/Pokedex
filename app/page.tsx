import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { type Pokemon } from "pokedex-promise-v2";

import { pokedex } from "@/api/client";
import { pokemonSearchSchema } from "@/api/search-pokemon-schema";
import { Button } from "@/components/button";
import { PaginationButtons } from "@/components/pagination-buttons";
import { PokemonCard } from "@/components/pokemon-card";
import { SearchInput } from "@/components/search-input";
import { SortByDropdown } from "@/components/sort-by-dropdown";

let cachedPokemonList: Pokemon[] | null = null;

const getPokemonList = async () => {
  if (cachedPokemonList !== null) {
    return cachedPokemonList;
  }
  const { count } = await pokedex.getPokemonsList();
  const pokemonList = await pokedex.getPokemonsList({
    offset: 0,
    limit: count,
  });

  const allPokemon: Pokemon[] = [];
  const pokemonURLs = pokemonList.results.map((pokemon) => pokemon.url);
  const chunkSize = 100;
  // Split the requests into chunks of 100
  const chunks: string[][] = Array.from(
    { length: Math.ceil(pokemonURLs.length / chunkSize) },
    (_, i) => pokemonURLs.slice(i * chunkSize, i * chunkSize + chunkSize)
  );
  for (let i = 0; i < chunks.length; i += 1) {
    const chunk = chunks[i];
    await Promise.all(
      chunk.map(async (pokemonURL, index) => {
        const pokemon: Pokemon = await fetch(pokemonURL, {
          cache: "force-cache",
        }).then((res) => res.json());
        allPokemon.push(pokemon);
        return pokemon;
      })
    );
  }
  cachedPokemonList = allPokemon;
  return allPokemon;
};

export default async function Home({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  const { sortBy, sortOrder, searchText, searchBy, offset, pageSize } =
    pokemonSearchSchema.parse(searchParams);

  const allPokemon = await getPokemonList();

  const filteredList = allPokemon
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

  const page = filteredList.slice(offset, offset + pageSize);
  const totalCount = filteredList.length;

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
          filteredListCount={filteredList.length}
          offset={offset}
          pageSize={pageSize}
        />
      </div>
      <div className="flex h-full flex-grow justify-center">
        {page.length === 0 ? (
          <span key="empty">No Pokémon found.</span>
        ) : (
          <div className="grid h-full w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {page.map((pokemon) => (
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
      {page.length !== 0 && (
        <PaginationButtons
          searchParams={searchParams}
          totalCount={totalCount}
          filteredListCount={filteredList.length}
          offset={offset}
          pageSize={pageSize}
        />
      )}
    </div>
  );
}
