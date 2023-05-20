import type { Meta } from '@storybook/react';

import { LazyImage } from './lazy-image';

const meta: Meta<typeof LazyImage> = {
  title: 'LazyImage',
  tags: ['autodocs'],
  component: LazyImage,
};

export default meta;

export function Default() {
  return (
    <div className="flex">
      <LazyImage
        className="h-40 w-40"
        image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
      />
    </div>
  );
}
