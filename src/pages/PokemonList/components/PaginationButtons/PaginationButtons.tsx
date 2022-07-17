import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Container, StyledButton } from './styled';

interface PaginationButtonsProps {
  hasPrevious: boolean;
  hasNext: boolean;
  previous: () => void;
  next: () => void;
}

export function PaginationButtons({
  hasPrevious,
  hasNext,
  previous,
  next,
}: PaginationButtonsProps) {
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
}
