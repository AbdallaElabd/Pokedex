import { Theme, theme } from '@styles/theme';
import styled from 'styled-components';

// export const Card = styled.div<{ elevation: keyof Theme['shadow'] }>`
//   border-radius: 1rem;
//   box-shadow: ${({ elevation }) => theme.shadow[elevation]};
// `;

export function Card({
  children,
  elevation,
}: {
  children: React.ReactNode;
  elevation: keyof Theme['shadow'];
}) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">{children}</div>
  );
}
