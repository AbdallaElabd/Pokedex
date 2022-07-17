import { SortByAttribute, SortOrder } from '@api/queries';
import { Button, Dropdown } from '@components';
import {
  faChevronDown,
  faSortAlphaAsc,
  faSortAlphaDesc,
  faSortAmountAsc,
  faSortAmountDesc,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Container, Option, StyledButton } from './styled';

const SORT_BY_ATTRIBUTES: SortByAttribute[] = ['name', 'height', 'weight'];

interface SortByDropdownProps {
  sortBy: SortByAttribute;
  setSortAttribute: (orderBy: SortByAttribute) => void;
  sortOrder: SortOrder;
  toggleSortOrder: () => void;
}

export function SortByDropdown({
  sortBy,
  setSortAttribute,
  sortOrder,
  toggleSortOrder,
}: SortByDropdownProps) {
  let sortIcon = sortOrder === 'ascending' ? faSortAlphaAsc : faSortAlphaDesc;
  if (sortBy !== 'name') {
    sortIcon = sortOrder === 'ascending' ? faSortAmountAsc : faSortAmountDesc;
  }

  return (
    <Container>
      <Dropdown
        toggler={(
          <StyledButton variant="primary">
            {sortBy}
            <FontAwesomeIcon icon={faChevronDown} />
          </StyledButton>
        )}
        content={(
          <>
            {SORT_BY_ATTRIBUTES.map((attribute) => (
              <Option
                key={attribute}
                isSelected={sortBy === 'name'}
                onClick={() => setSortAttribute(attribute)}
              >
                {attribute}
              </Option>
            ))}
          </>
        )}
      />

      <Button variant="primary" onClick={toggleSortOrder}>
        <FontAwesomeIcon icon={sortIcon} />
      </Button>
    </Container>
  );
}
