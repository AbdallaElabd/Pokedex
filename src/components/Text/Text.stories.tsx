import { Text } from './Text';

export default {
  component: Text,
};

export function Default() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Text variant="h1">Heading 1</Text>
      <Text variant="h2">Heading 2</Text>
      <Text variant="h3">Heading 3</Text>
      <Text variant="h4">Heading 4</Text>
      <Text variant="h5">Heading 5</Text>
      <Text variant="h6">Heading 6</Text>
      <Text variant="body1">Body1</Text>
      <Text variant="body2">Body2</Text>
      <Text variant="caption">Caption</Text>
    </div>
  );
}
