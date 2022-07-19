import { SearchByAttribute } from "@api/queries";
import { Dropdown } from "@components";
import {
  faBoltLightning,
  faFont,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePokedex } from "@providers/Pokedex";

import {
  ClearButtonContainer,
  SearchIconContainer,
  SearchInputContainer,
  StyledInput,
  StyledText,
} from "./styled";

const SEARCH_BY_ATTRIBUTES: SearchByAttribute[] = ["name", "ability"];

export function SearchInput() {
  const { searchText, search, searchBy, setSearchBy } = usePokedex();
  return (
    <>
      <Dropdown
        toggler={
          <StyledText variant="button">
            {`Search by ${searchBy}`}
            <FontAwesomeIcon
              icon={searchBy === "ability" ? faBoltLightning : faFont}
            />
          </StyledText>
        }
        options={SEARCH_BY_ATTRIBUTES}
        selected={searchBy}
        renderOption={(option) => (
          <StyledText variant="body2" capitalize>
            <FontAwesomeIcon
              icon={option === "ability" ? faBoltLightning : faFont}
              size="sm"
            />
            {option}
          </StyledText>
        )}
        onOptionClicked={setSearchBy}
      />

      <SearchInputContainer>
        <StyledInput
          placeholder={`Search by ${searchBy}...`}
          value={searchText}
          onChange={(event) => search(event.target.value)}
        />
        <SearchIconContainer>
          <FontAwesomeIcon icon={faSearch} />
        </SearchIconContainer>
        <ClearButtonContainer isShown={!!searchText} onClick={() => search("")}>
          <FontAwesomeIcon icon={faTimes} />
        </ClearButtonContainer>
      </SearchInputContainer>
    </>
  );
}
