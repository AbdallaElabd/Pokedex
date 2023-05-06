import { PokemonSearchSchema } from '@api/queries/search-pokemon-schema';
import { Button, Dropdown } from '@components';
import {
  faArrowLeft,
  faArrowRight,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePokedex } from '@providers/Pokedex';

const PAGE_SIZE_OPTIONS = [
  10, 20, 50,
] satisfies PokemonSearchSchema['pageSize'][];

export function PaginationButtons() {
  const {
    totalCount,
    hasPrevious,
    hasNext,
    previous,
    next,
    offset,
    pageSize,
    changePageSize,
  } = usePokedex();

  const pageStart = Number(offset);
  const pageEnd = Math.min(Number(offset) + Number(pageSize), totalCount ?? 0);

  return (
    <div className="flex flex-wrap items-center justify-end gap-4">
      <span className="text-base">Pokemon per page</span>

      <Dropdown
        toggler={
          <div className="flex items-center gap-2">
            {`${pageSize}`}
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        }
        options={PAGE_SIZE_OPTIONS}
        selected={pageSize}
        renderOption={(option) => <span className="text-sm">{option}</span>}
        onOptionClicked={changePageSize}
      />

      <span className="text-base">
        {`${pageStart}-${pageEnd} of ${totalCount}`}
      </span>

      <div className="flex gap-2">
        <Button
          className="flex items-center gap-2"
          disabled={!hasPrevious}
          onClick={previous}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <Button
          className="flex items-center gap-2"
          disabled={!hasNext}
          onClick={next}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </Button>
      </div>
    </div>
  );
}
