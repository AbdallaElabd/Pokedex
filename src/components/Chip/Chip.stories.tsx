import { Chip } from './Chip';

export default {
  component: Chip,
};

export function Default() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
      <Chip variant="primary">Primary</Chip>
      <Chip variant="secondary">Secondary</Chip>
      <Chip variant="neutral">Neutral</Chip>
    </div>
  );
}
