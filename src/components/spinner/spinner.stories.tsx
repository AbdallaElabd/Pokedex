import { Spinner } from './spinner';

export default {
  component: Spinner,
};

export function Default() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Spinner />
    </div>
  );
}