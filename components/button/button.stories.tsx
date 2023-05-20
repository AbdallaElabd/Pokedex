import type { Meta } from '@storybook/react';

import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Button',
  tags: ['autodocs'],
  component: Button,
};

export default meta;

export function Default() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="neutral">Neutral</Button>
    </div>
  );
}
