import { LazyImage } from '@components';
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
`;

export const StyledLazyImage = styled(LazyImage)`
    align-self: center;
    height: auto;
    width: clamp(5rem, 10vw, 10rem);
    height: clamp(5rem, 10vw, 10rem);
`;

export const Row = styled.span`
    text-transform: capitalize;
`;
