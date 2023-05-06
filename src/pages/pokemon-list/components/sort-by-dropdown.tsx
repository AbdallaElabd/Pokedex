import { PokemonSearchSchema } from '@api/search-pokemon-schema';
import { Button } from '@components/button';
import { Dropdown } from '@components/dropdown';
import {
  faFont,
  faSortAlphaAsc,
  faSortAlphaDesc,
  faSortAmountAsc,
  faSortAmountDesc,
  faStairs,
  faWeightScale,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SORT_BY_ATTRIBUTES = [
  'name',
  'height',
  'weight',
] satisfies PokemonSearchSchema['sortBy'][];

type SortByDropdownProps = {
  sortBy: PokemonSearchSchema['sortBy'];
  setSortAttribute: (attribute: PokemonSearchSchema['sortBy']) => void;
  sortOrder: PokemonSearchSchema['sortOrder'];
  toggleSortOrder: () => void;
};

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
          setSortAttribute(option);
        }}
      />

      <Button onClick={toggleSortOrder}>
        <FontAwesomeIcon icon={sortIcon} />
      </Button>
    </>
  );
}
