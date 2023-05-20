import type { Meta } from "@storybook/react";
import { useState } from "react";

import { Dropdown } from "./dropdown";

const meta: Meta<typeof Dropdown> = {
  title: "Dropdown",
  tags: ["autodocs"],
  component: Dropdown,
};

export default meta;

export function Default() {
  const [selected, setSelected] = useState("Option 1");
  return (
    <Dropdown
      options={["Option 1", "Option 2", "Option 3"]}
      renderPlaceholder={(option) => option}
      selected={selected}
      onChange={(option) => setSelected(option)}
    />
  );
}
