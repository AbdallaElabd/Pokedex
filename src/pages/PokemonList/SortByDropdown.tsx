import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faSortAlphaAsc,
  faSortAlphaDesc,
  faSortAmountAsc,
  faSortAmountDesc,
} from '@fortawesome/free-solid-svg-icons';
import { Button } from '@components';
import styled from 'styled-components';
import { FunctionComponent } from 'react';
import { SortByAttribute, SortOrder } from '@api/queries';

const SORT_BY_ATTRIBUTES: SortByAttribute[] = ['name', 'height', 'weight'];

interface SortByDropdownProps {
  sortBy: SortByAttribute;
  setSortAttribute: (orderBy: SortByAttribute) => void;
  sortOrder: SortOrder;
  toggleSortOrder: () => void;
}

export const SortByDropdown: FunctionComponent<SortByDropdownProps> = ({
  sortBy,
  setSortAttribute,
  sortOrder,
  toggleSortOrder,
}) => {
  let sortIcon = sortOrder === 'ascending' ? faSortAlphaAsc : faSortAlphaDesc;
  if (sortBy !== 'name') {
    sortIcon = sortOrder === 'ascending' ? faSortAmountAsc : faSortAmountDesc;
  }

  return (
    <Container>
      <DropDownButton>
        <StyledButton variant="secondary">
          {sortBy}
          <FontAwesomeIcon icon={faChevronDown} />
        </StyledButton>
        <Content>
          {SORT_BY_ATTRIBUTES.map((attribute) => (
            <Option
              key={attribute}
              isSelected={sortBy === 'name'}
              onClick={() => setSortAttribute(attribute)}
            >
              {attribute}
            </Option>
          ))}
        </Content>
      </DropDownButton>

      <Button variant="primary" onClick={toggleSortOrder}>
        <FontAwesomeIcon icon={sortIcon} />
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Content = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  min-width: 110%;
  z-index: 1;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 0.3rem;
  display: flex;
  flex-direction: column;
  opacity: 0;
  transform: translateY(-1rem);
  --transition-config: 0.15s ease-in-out;
  transition: opacity var(--transition-config),
    transform var(--transition-config);
  pointer-events: none;
`;

const Option = styled.button<{ isSelected: boolean }>`
  padding: 0.5rem;
  text-transform: capitalize;

  border: none;
  background: ${({ isSelected }) => (isSelected ? '#bbb' : 'initial')};
  cursor: pointer;

  :not(:last-child) {
    border-bottom: 1px solid lightgrey;
  }

  :hover {
    background-color: rgba(0, 0, 0, 5%);
  }
`;

const DropDownButton = styled.div`
  position: relative;

  :hover,
  :active {
    & ${Content} {
      pointer-events: auto;
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const StyledButton = styled(Button)`
  display: flex;
  gap: 0.5rem;
  text-transform: capitalize;
`;
