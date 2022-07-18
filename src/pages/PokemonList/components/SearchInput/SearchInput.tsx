import { SearchByAttribute } from "@api/queries";
import { Dropdown } from "@components";
import {
  faBoltLightning,
  faFont,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { theme } from "@styles/theme";

import {
  SearchIconContainer,
  SearchInputContainer,
  StyledInput,
  StyledText,
} from "./styled";

interface SearchInputProps {
  searchText: string;
  setSearchText: (text: string) => void;
  searchBy: SearchByAttribute;
  setSearchBy: (attribute: SearchByAttribute) => void;
}

const SEARCH_BY_ATTRIBUTES: SearchByAttribute[] = ["name", "ability"];

export function SearchInput({
  searchText,
  setSearchText,
  searchBy,
  setSearchBy,
}: SearchInputProps) {
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
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
        <SearchIconContainer>
          <FontAwesomeIcon
            icon={faSearch}
            color={theme.colors.secondaryShadow}
          />
        </SearchIconContainer>
      </SearchInputContainer>
    </>
  );
}
