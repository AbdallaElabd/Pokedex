import { Button } from "./Button";

export default {
  component: Button,
};

export function Default() {
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="neutral">Neutral</Button>
      <Button variant="surface">Surface</Button>
    </div>
  );
}
