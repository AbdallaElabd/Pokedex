import { PageSize } from "@api/queries";
import { Dropdown, Text } from "@components";
import {
  faArrowLeft,
  faArrowRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePokedex } from "@providers/Pokedex";

import {
  ButtonsContainer,
  Container,
  StyledButton,
  StyledText,
} from "./styled";

const PAGE_SIZE_OPTIONS: PageSize[] = ["10", "20", "50"];

export function PaginationButtons() {
  const {
    totalCount,
    hasPrevious,
    hasNext,
    previous,
    next,
    offset,
    pageSize,
    changePageSize,
  } = usePokedex();

  const pageStart = Number(offset);
  const pageEnd = Math.min(Number(offset) + Number(pageSize), totalCount ?? 0);

  return (
    <Container>
      <StyledText variant="body1">Pokemon per page:</StyledText>

      <Dropdown
        toggler={
          <StyledText variant="button">
            {`${pageSize}`}
            <FontAwesomeIcon icon={faChevronDown} />
          </StyledText>
        }
        options={PAGE_SIZE_OPTIONS}
        selected={pageSize}
        renderOption={(option) => <Text variant="body2">{option}</Text>}
        onOptionClicked={changePageSize}
      />

      <StyledText variant="body1">
        {`${pageStart}-${pageEnd} of ${totalCount}`}
      </StyledText>

      <ButtonsContainer>
        <StyledButton disabled={!hasPrevious} onClick={previous}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </StyledButton>
        <StyledButton disabled={!hasNext} onClick={next}>
          <FontAwesomeIcon icon={faArrowRight} />
        </StyledButton>
      </ButtonsContainer>
    </Container>
  );
}
