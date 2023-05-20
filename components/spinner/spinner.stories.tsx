import type { Meta } from "@storybook/react";

import { Spinner } from "./spinner";

const meta: Meta<typeof Spinner> = {
  title: "Spinner",
  tags: ["autodocs"],
  component: Spinner,
};

export default meta;

export function Default() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Spinner text="Loading" />
    </div>
  );
}
