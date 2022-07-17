import { PageSize } from "@api/queries";
import { Dropdown } from "@components";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Container, Option, StyledButton } from "./styled";

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
    <Container>
      <Dropdown
        toggler={
          <StyledButton variant="primary">
            Page size: {pageSize}
            <FontAwesomeIcon icon={faChevronDown} />
          </StyledButton>
        }
        content={
          <>
            {PAGE_SIZE_OPTIONS.map((option) => (
              <Option
                key={option}
                isSelected={pageSize === option}
                onClick={() => changePageSize(option)}
              >
                {option}
              </Option>
            ))}
          </>
        }
      />
    </Container>
  );
}
