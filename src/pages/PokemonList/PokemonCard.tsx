import { Card, LazyImage } from '@components';
import { Link } from 'react-router-dom';
import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Pokemon } from '@api/cache';

export const PokemonCard: FunctionComponent<{ pokemon: Pokemon }> = ({
  pokemon,
}) => {
  return (
    <Link to={`/pokemon/${pokemon.name}`}>
      <Card>
        <Container>
          <StyledLazyImage src={pokemon.image} alt={pokemon.name} />
          <Row>{pokemon.name}</Row>
          <Row>Height: {pokemon.height} decimetres</Row>
          <Row>Weight: {pokemon.weight} hectograms</Row>
        </Container>
      </Card>
    </Link>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const StyledLazyImage = styled(LazyImage)`
  align-self: center;
  height: auto;
  width: clamp(5rem, 10vw, 10rem);
  height: clamp(5rem, 10vw, 10rem);
`;

const Row = styled.span`
  text-transform: capitalize;
`;
