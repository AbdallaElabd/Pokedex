import { useGetPokemonDetails } from "@api/queries";
import { Abilities, Spinner, Text } from "@components";
import { Chip } from "@components/Chip";
import { capitalize, formatHeight, formatWeight } from "@utils";
import { useParams } from "react-router-dom";

import {
  Container,
  DetailsSection,
  ImageSection,
  PokemonImage,
  Row,
} from "./styled";

export function PokemonDetails() {
  const { pokemonName } = useParams();

  const { isLoading, pokemonDetails: pokemon } =
    useGetPokemonDetails(pokemonName);

  if (isLoading || !pokemon) return <Spinner />;

  return (
    <Container>
      <ImageSection>
        <Text variant="h4">{capitalize(pokemon.name)}</Text>

        <PokemonImage
          src={pokemon.sprites.other["official-artwork"]?.front_default}
        />
      </ImageSection>

      <DetailsSection>
        <Row>
          <Text variant="body1">{`Height: ${formatHeight(
            pokemon.height
          )}`}</Text>
        </Row>

        <Row>
          <Text variant="body1">{`Weight: ${formatWeight(
            pokemon.weight
          )}`}</Text>
        </Row>

        <Row>
          <Text variant="body1">{`Base experience: ${pokemon.base_experience}`}</Text>
        </Row>

        <Row>
          <Text variant="body1">Stats</Text>
          {pokemon.stats.map((stat) => (
            <Chip key={stat.stat.name}>{`${capitalize(stat.stat.name)}: ${
              stat.base_stat
            }`}</Chip>
          ))}
        </Row>

        <Row>
          <Text variant="body1">Types</Text>
          {pokemon.types.map((type) => (
            <Chip>{capitalize(type.type.name)}</Chip>
          ))}
        </Row>

        <Row>
          <Text variant="body1">Abilities</Text>
          <Abilities abilities={pokemon.abilities} />
        </Row>
      </DetailsSection>
    </Container>
  );
}
