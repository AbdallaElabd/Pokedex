import { Card } from "@components";
import { GetPokemonDetails } from "@api/pokemonDetails";
import { Link } from "react-router-dom";
import { FunctionComponent } from "react";
import styled from "styled-components";

export const PokemonCard: FunctionComponent<{ pokemon: GetPokemonDetails }> = ({
  pokemon,
}) => {
  return (
    <Link to={`/pokemon/${pokemon.name}`}>
      <Card>
        <Container>
          <Image src={pokemon.image} alt={pokemon.name} />
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

const Image = styled.img`
  align-self: center;
  width: clamp(5rem, 10vw, 10rem);
`;

const Row = styled.span`
  text-transform: capitalize;
`;
