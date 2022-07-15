import { FunctionComponent } from "react";

interface PaginationButtonsProps {
  previous: (() => void) | undefined;
  next: (() => void) | undefined;
}

export const PaginationButtons: FunctionComponent<PaginationButtonsProps> = ({
  previous,
  next,
}) => {
  return (
    <>
      {previous && <button onClick={previous}>previous</button>}
      {next && <button onClick={next}>next</button>}
    </>
  );
};
