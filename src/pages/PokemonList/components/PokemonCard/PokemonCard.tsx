import { Pokemon } from "@api/cache";
import { Card } from "@components";
import { Link } from "react-router-dom";

import { Container, Row, StyledLazyImage } from "./styled";

export function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <Link to={`/pokemon/${pokemon.name}`}>
      <Card>
        <Container>
          <StyledLazyImage
            src={pokemon.sprites.other?.["official-artwork"]?.front_default}
            alt={pokemon.name}
          />
          <Row>{pokemon.name}</Row>
          <Row>
            Height:
            {pokemon.height} decimetres
          </Row>
          <Row>
            Weight:
            {pokemon.weight} hectograms
          </Row>
        </Container>
      </Card>
    </Link>
  );
}
