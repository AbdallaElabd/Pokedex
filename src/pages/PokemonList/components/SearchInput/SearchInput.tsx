import { theme } from '@styles/theme';
import { ChangeEventHandler, useCallback } from 'react';
import styled from 'styled-components';

interface SearchInputProps {
  searchText: string;
  setSearchText: (text: string) => void;
}

const StyledInput = styled.input`
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid ${theme.colors.black};
`;

export function SearchInput({
  searchText,
  setSearchText,
}: SearchInputProps) {
  const handleOnChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setSearchText(event.target.value);
    },
    [setSearchText],
  );
  return <StyledInput value={searchText} onChange={handleOnChange} />;
}
