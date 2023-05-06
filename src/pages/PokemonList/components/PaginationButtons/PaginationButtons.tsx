import { PageSize } from '@api/queries';
import { Button, Dropdown, Text } from '@components';
import {
  faArrowLeft,
  faArrowRight,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePokedex } from '@providers/Pokedex';

const PAGE_SIZE_OPTIONS: PageSize[] = ['10', '20', '50'];

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
    <div className="flex w-full flex-wrap items-center justify-end gap-4">
      <span className="text-base">Pokemon per page</span>

      <Dropdown
        toggler={
          <Button className="flex items-center gap-2 text-base">
            {`${pageSize}`}
            <FontAwesomeIcon icon={faChevronDown} />
          </Button>
        }
        options={PAGE_SIZE_OPTIONS}
        selected="10"
        // selected={pageSize}
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
