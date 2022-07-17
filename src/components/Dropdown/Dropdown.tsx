import { ReactNode } from "react";

import { Content, DropDownButton } from "./styled";

interface DropdownProps {
  toggler: ReactNode;
  content: ReactNode;
}

export function Dropdown({ toggler, content }: DropdownProps) {
  return (
    <DropDownButton>
      {toggler}
      <Content>{content}</Content>
    </DropDownButton>
  );
}
