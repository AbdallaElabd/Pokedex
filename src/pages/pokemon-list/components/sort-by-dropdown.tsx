import { PokemonSearchSchema } from '@api/queries/search-pokemon-schema';
import { Button } from '@components/Button';
import { Dropdown } from '@components/Dropdown';
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
        toggler={
          <div className="flex items-center gap-2">
            {`Sort by ${sortBy}`}
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        }
        options={SORT_BY_ATTRIBUTES}
        selected={sortBy}
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
        onOptionClicked={(option) => {
          setSortAttribute(option);
        }}
      />

      <Button onClick={toggleSortOrder}>
        <FontAwesomeIcon icon={sortIcon} />
      </Button>
    </>
  );
}
