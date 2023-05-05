import { SearchByAttribute } from '@api/queries';
import { Dropdown } from '@components';
import {
  faBoltLightning,
  faFont,
  faSearch,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePokedex } from '@providers/Pokedex';
import { useCallback, useRef } from 'react';

import {
  ClearButtonContainer,
  SearchIconContainer,
  SearchInputContainer,
  StyledInput,
  StyledText,
} from './styled';

const SEARCH_BY_ATTRIBUTES: SearchByAttribute[] = ['name', 'ability'];

export function SearchInput() {
  const { searchText, search, searchBy, setSearchBy } = usePokedex();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnClear = useCallback(() => {
    search('');
    inputRef.current?.focus();
  }, [search]);

  return (
    <>
      <Dropdown
        toggler={
          <StyledText variant="button">
            {`Search by ${searchBy}`}
            <div>
              <FontAwesomeIcon
                icon={searchBy === 'ability' ? faBoltLightning : faFont}
              />
            </div>
          </StyledText>
        }
        options={SEARCH_BY_ATTRIBUTES}
        selected={searchBy}
        renderOption={(option) => (
          <StyledText variant="body2" capitalize>
            <FontAwesomeIcon
              icon={option === 'ability' ? faBoltLightning : faFont}
              size="sm"
            />
            {option}
          </StyledText>
        )}
        onOptionClicked={setSearchBy}
      />

      <SearchInputContainer>
        <StyledInput
          className="placeholder:text-base"
          type="text"
          ref={inputRef}
          placeholder={`Search by ${searchBy}...`}
          value={searchText}
          onChange={(event) => search(event.target.value)}
        />
        <SearchIconContainer>
          <FontAwesomeIcon icon={faSearch} />
        </SearchIconContainer>
        <ClearButtonContainer
          isShown={!!searchText}
          tabIndex={searchText ? 0 : -1}
          onClick={handleOnClear}
        >
          <FontAwesomeIcon icon={faTimes} />
        </ClearButtonContainer>
      </SearchInputContainer>
    </>
  );
}
