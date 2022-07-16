import { Button } from "@components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FunctionComponent } from "react";
import styled from "styled-components";

interface PaginationButtonsProps {
  hasPrevious: boolean;
  hasNext: boolean;
  previous: () => void;
  next: () => void;
}

export const PaginationButtons: FunctionComponent<PaginationButtonsProps> = ({
  hasPrevious,
  hasNext,
  previous,
  next,
}) => {
  return (
    <Container>
      {hasPrevious && (
        <StyledButton variant="primary" onClick={previous}>
          <FontAwesomeIcon icon={faArrowLeft} />
          Previous
        </StyledButton>
      )}
      {hasNext && (
        <StyledButton variant="primary" onClick={next}>
          Next
          <FontAwesomeIcon icon={faArrowRight} />
        </StyledButton>
      )}
    </Container>
  );
};

const Container = styled.div`
  align-self: flex-end;
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const StyledButton = styled(Button)`
  display: flex;
  gap: 0.5rem;
`;
