import { PokemonSearchSchema } from '@api/queries/search-pokemon-schema';
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
import { usePokedex } from '@providers/pokedex';

const SORT_BY_ATTRIBUTES = [
  'name',
  'height',
  'weight',
] satisfies PokemonSearchSchema['sortBy'][];

export function SortByDropdown() {
  const { sortBy, setSortAttribute, sortOrder, toggleSortOrder } = usePokedex();

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
