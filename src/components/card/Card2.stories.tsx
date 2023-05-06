import type { Meta } from '@storybook/react';

import { Card } from './Card2';

const meta: Meta<typeof Card> = {
  title: 'Card',
  tags: ['autodocs'],
  component: Card,
};

export default meta;

export function Default() {
  return (
    <div className="flex flex-wrap gap-8">
      <Card
        elevation="sm"
        className="flex h-32 w-32 items-center justify-center"
      >
        <span>Elevation: sm</span>
      </Card>
      <Card
        elevation="md"
        className="flex h-32 w-32 items-center justify-center"
      >
        <span>Elevation: md</span>
      </Card>
      <Card
        elevation="lg"
        className="flex h-32 w-32 items-center justify-center"
      >
        <span>Elevation: lg</span>
      </Card>
      <Card
        elevation="xl"
        className="flex h-32 w-32 items-center justify-center"
      >
        <span>Elevation: xl</span>
      </Card>
      <Card
        elevation="2xl"
        className="flex h-32 w-32 items-center justify-center"
      >
        <span>Elevation: 2xl</span>
      </Card>
    </div>
  );
}
