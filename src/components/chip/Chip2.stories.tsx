import type { Meta } from '@storybook/react';

import { Chip } from './Chip2';

const meta: Meta<typeof Chip> = {
  title: 'Chip',
  tags: ['autodocs'],
  component: Chip,
};

export default meta;

export function Elevations() {
  return (
    <div className="flex flex-col gap-2">
      <Chip variant="primary">Primary</Chip>
      <Chip variant="secondary">Secondary</Chip>
      <Chip variant="neutral">Neutral</Chip>
    </div>
  );
}

export function Sizes() {
  return (
    <div className="flex flex-col gap-2">
      <Chip size="lg">Large</Chip>
      <Chip size="md">Medium</Chip>
      <Chip size="sm">Small</Chip>
    </div>
  );
}
