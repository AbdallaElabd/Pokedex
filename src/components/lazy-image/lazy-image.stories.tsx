import { LazyImage } from './lazy-image';

export default {
  component: LazyImage,
};

export function Default() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
      <LazyImage
        className="h-40 w-40"
        image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
      />
    </div>
  );
}
