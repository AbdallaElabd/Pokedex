"use client";

import {
  PokemonSearchSchema,
  updatePokemonSearchParams,
} from "@/api/search-pokemon-schema";
import { Button } from "@/components/button";
import { Dropdown } from "@/components/dropdown";
import {
  faFont,
  faSortAlphaAsc,
  faSortAlphaDesc,
  faSortAmountAsc,
  faSortAmountDesc,
  faStairs,
  faWeightScale,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

const SORT_BY_ATTRIBUTES = [
  "name",
  "height",
  "weight",
] satisfies PokemonSearchSchema["sortBy"][];

type SortByDropdownProps = {
  sortBy: PokemonSearchSchema["sortBy"];
  sortOrder: PokemonSearchSchema["sortOrder"];
  searchParams: URLSearchParams;
};

export function SortByDropdown({
  sortBy,
  sortOrder,
  searchParams,
}: SortByDropdownProps) {
  let sortIcon = sortOrder === "ascending" ? faSortAlphaAsc : faSortAlphaDesc;
  if (sortBy !== "name") {
    sortIcon = sortOrder === "ascending" ? faSortAmountAsc : faSortAmountDesc;
  }

  const router = useRouter();

  return (
    <>
      <Dropdown
        options={SORT_BY_ATTRIBUTES}
        selected={sortBy}
        renderPlaceholder={(option) => `Sort by ${option}`}
        renderOption={(option) => {
          const icon = {
            name: faFont,
            height: faStairs,
            weight: faWeightScale,
          }[option];
          return (
            <span className="flex items-center gap-3 text-sm capitalize">
              <FontAwesomeIcon icon={icon} size="sm" />
              {option}
            </span>
          );
        }}
        onChange={(option) => {
          const newUrl = updatePokemonSearchParams(searchParams, [
            ["sortBy", option],
            // Go back to the first page when changing the sort field
            ["offset", "0"],
          ]);
          router.replace(`?${newUrl}`);
        }}
      />

      <Button
        variant="primary"
        onClick={() => {
          const newUrl = updatePokemonSearchParams(searchParams, [
            [
              "sortOrder",
              sortOrder === "ascending" ? "descending" : "ascending",
            ],
            // Go back to the first page when changing the sort order
            ["offset", "0"],
          ]);
          router.replace(`?${newUrl}`);
        }}
      >
        <FontAwesomeIcon icon={sortIcon} />
      </Button>
    </>
  );
}
