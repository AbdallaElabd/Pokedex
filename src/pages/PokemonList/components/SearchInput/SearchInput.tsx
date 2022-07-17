import { SearchByAttribute } from "@api/queries";
import { Dropdown } from "@components";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { theme } from "@styles/theme";
import { ChangeEventHandler, useCallback } from "react";
import styled from "styled-components";

import { StyledButton } from "./styled";

interface SearchInputProps {
  searchText: string;
  setSearchText: (text: string) => void;
  searchBy: SearchByAttribute;
  setSearchBy: (attribute: SearchByAttribute) => void;
}

const StyledInput = styled.input`
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid ${theme.colors.black};
`;

const SEARCH_BY_ATTRIBUTES: SearchByAttribute[] = ["name", "ability"];

export function SearchInput({
  searchText,
  setSearchText,
  searchBy,
  setSearchBy,
}: SearchInputProps) {
  const handleOnChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setSearchText(event.target.value);
    },
    [setSearchText]
  );
  return (
    <>
      <Dropdown
        toggler={
          <StyledButton variant="primary">
            Search by: {searchBy}
            <FontAwesomeIcon icon={faSearch} />
          </StyledButton>
        }
        content={SEARCH_BY_ATTRIBUTES.map((attribute) => (
          // eslint-disable-next-line react/button-has-type
          <button key={attribute} onClick={() => setSearchBy(attribute)}>
            {attribute}
          </button>
        ))}
      />
      <StyledInput value={searchText} onChange={handleOnChange} />
    </>
  );
}
