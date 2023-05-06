import { PokemonSearchSchema } from '@api/search-pokemon-schema';
import { Button } from '@components/button';
import { Dropdown } from '@components/dropdown';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PAGE_SIZE_OPTIONS = [
  10, 20, 50,
] satisfies PokemonSearchSchema['pageSize'][];

type PaginationButtonsProps = {
  totalCount: number | undefined;
  hasPrevious: boolean;
  hasNext: boolean;
  changePage: (direction: 'previous' | 'next') => void;
  offset: number;
  pageSize: PokemonSearchSchema['pageSize'];
  changePageSize: (pageSize: PokemonSearchSchema['pageSize']) => void;
};

export function PaginationButtons({
  totalCount,
  hasPrevious,
  hasNext,
  changePage,
  offset,
  pageSize,
  changePageSize,
}: PaginationButtonsProps) {
  const pageStart = offset;
  const pageEnd = Math.min(offset + pageSize, totalCount ?? 0);

  return (
    <div className="flex flex-wrap items-center justify-end gap-4">
      <Dropdown
        renderPlaceholder={(option) => `Page size: ${option}`}
        options={PAGE_SIZE_OPTIONS}
        selected={pageSize}
        renderOption={(option) => <span className="text-sm">{option}</span>}
        onChange={(option) => changePageSize(option)}
      />

      <span className="text-base">
        {`${pageStart}-${pageEnd} of ${totalCount}`}
      </span>

      <div className="flex gap-2">
        <Button
          className="flex items-center gap-2"
          disabled={!hasPrevious}
          onClick={() => changePage('previous')}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <Button
          className="flex items-center gap-2"
          disabled={!hasNext}
          onClick={() => changePage('next')}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </Button>
      </div>
    </div>
  );
}
