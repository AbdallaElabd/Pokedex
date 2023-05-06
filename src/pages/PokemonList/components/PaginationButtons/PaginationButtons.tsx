import { PageSize } from '@api/queries';
import { Dropdown, Text } from '@components';
import {
  faArrowLeft,
  faArrowRight,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePokedex } from '@providers/Pokedex';

import { ButtonsContainer, StyledButton } from './styled';

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
          <span className="flex items-center gap-2 text-base">
            {`${pageSize}`}
            <FontAwesomeIcon icon={faChevronDown} />
          </span>
        }
        options={PAGE_SIZE_OPTIONS}
        selected={pageSize}
        renderOption={(option) => <Text variant="body2">{option}</Text>}
        onOptionClicked={changePageSize}
      />

      <span className="text-base">
        {`${pageStart}-${pageEnd} of ${totalCount}`}
      </span>

      <ButtonsContainer>
        <StyledButton disabled={!hasPrevious} onClick={previous}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </StyledButton>
        <StyledButton disabled={!hasNext} onClick={next}>
          <FontAwesomeIcon icon={faArrowRight} />
        </StyledButton>
      </ButtonsContainer>
    </div>
  );
}
