import { Text } from "./Text";

export default {
  component: Text,
};

export function Headings() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Text variant="h1">Button</Text>
      <Text variant="h2">Button</Text>
      <Text variant="h3">Button</Text>
      <Text variant="h4">Button</Text>
      <Text variant="h5">Button</Text>
      <Text variant="h6">Button</Text>
      <Text variant="body1">Button</Text>
      <Text variant="body2">Button</Text>
    </div>
  );
}
