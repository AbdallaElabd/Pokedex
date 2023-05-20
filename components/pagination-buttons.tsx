"use client";

import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown } from "./dropdown";
import { Button } from "./button";
import {
  PokemonSearchSchema,
  updatePokemonSearchParams,
} from "@/api/search-pokemon-schema";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PAGE_SIZE_OPTIONS = [
  10, 20, 50,
] satisfies PokemonSearchSchema["pageSize"][];

type PaginationButtonsProps = {
  totalCount: number | undefined;
  filteredListCount: number;
  offset: number;
  pageSize: PokemonSearchSchema["pageSize"];
  searchParams: URLSearchParams;
};

export function PaginationButtons({
  totalCount,
  filteredListCount,
  offset,
  pageSize,
  searchParams,
}: PaginationButtonsProps) {
  const hasNext = offset + pageSize < filteredListCount;
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

  const pageStart = offset;
  const pageEnd = Math.min(offset + pageSize, totalCount ?? 0);

  const router = useRouter();

  return (
    <div className="flex flex-wrap items-center justify-end gap-4 text-slate-900">
      <Dropdown
        renderPlaceholder={(option) => `Show ${option} per page...`}
        options={PAGE_SIZE_OPTIONS}
        selected={pageSize}
        renderOption={async (option) => (
          <span className="text-sm">{option}</span>
        )}
        onChange={(newPageSize) => {
          const newUrl = updatePokemonSearchParams(searchParams, [
            ["pageSize", `${newPageSize}`],
            ["offset", "0"],
          ]);
          router.replace(`?${newUrl}`);
        }}
      />

      <span className="text-base">
        {`${pageStart}-${pageEnd} of ${totalCount}`}
      </span>

      <div className="flex gap-2">
        <Link href={{ pathname: "/", search: previousPageUrl }}>
          <Button
            variant="primary"
            className="flex items-center gap-2"
            disabled={!hasPrevious}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
          </Button>
        </Link>
        <Link href={{ pathname: "/", search: nextPageUrl }}>
          <Button
            variant="primary"
            className="flex items-center gap-2"
            disabled={!hasNext}
          >
            <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
