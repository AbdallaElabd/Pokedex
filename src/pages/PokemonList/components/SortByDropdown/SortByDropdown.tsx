import { SortByAttribute } from '@api/queries';
import { Button, Dropdown } from '@components';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faChevronDown,
  faFont,
  faSortAlphaAsc,
  faSortAlphaDesc,
  faSortAmountAsc,
  faSortAmountDesc,
  faStairs,
  faWeightScale,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePokedex } from '@providers/Pokedex';

const SORT_BY_ATTRIBUTES: SortByAttribute[] = ['name', 'height', 'weight'];

function getSortAttributeIcon(sortBy: SortByAttribute): IconProp {
  switch (sortBy) {
    case 'name':
      return faFont;
    case 'height':
      return faStairs;
    case 'weight':
    default:
      return faWeightScale;
  }
}

export function SortByDropdown() {
  const { sortBy, setSortAttribute, sortOrder, toggleSortOrder } = usePokedex();

  let sortIcon = sortOrder === 'ascending' ? faSortAlphaAsc : faSortAlphaDesc;
  if (sortBy !== 'name') {
    sortIcon = sortOrder === 'ascending' ? faSortAmountAsc : faSortAmountDesc;
  }

  return (
    <>
      <Dropdown
        toggler={
          <div className="flex items-center gap-2">
            {`Sort by ${sortBy}`}
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        }
        options={SORT_BY_ATTRIBUTES}
        selected={sortBy}
        renderOption={(option) => (
          <span className="flex items-center gap-3 text-sm capitalize">
            <FontAwesomeIcon icon={getSortAttributeIcon(option)} size="sm" />
            {option}
          </span>
        )}
        onOptionClicked={setSortAttribute}
      />

      <Button onClick={toggleSortOrder}>
        <FontAwesomeIcon icon={sortIcon} />
      </Button>
    </>
  );
}
