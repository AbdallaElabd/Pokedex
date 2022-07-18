import { PageSize } from "@api/queries";
import { Dropdown, Text } from "@components";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { StyledText } from "./styled";

const PAGE_SIZE_OPTIONS: PageSize[] = ["10", "20", "50"];

interface PageSizeDropdownProps {
  pageSize: PageSize;
  changePageSize: (pageSize: PageSize) => void;
}

export function PageSizeDropdown({
  pageSize,
  changePageSize,
}: PageSizeDropdownProps) {
  return (
    <Dropdown
      toggler={
        <StyledText variant="button">
          {`Page size ${pageSize}`}
          <FontAwesomeIcon icon={faChevronDown} />
        </StyledText>
      }
      options={PAGE_SIZE_OPTIONS}
      selected={pageSize}
      renderOption={(option) => <Text variant="body2">{option}</Text>}
      onOptionClicked={changePageSize}
    />
  );
}
