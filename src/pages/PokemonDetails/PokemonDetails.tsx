import { useGetPokemonDetails } from '@api/queries';
import { Abilities, Spinner, Text } from '@components';
import { Chip } from '@components/Chip';
import { pokemonDetailsRoute } from '@router';
import { useParams } from '@tanstack/router';
import { capitalize, formatHeight, formatWeight } from '@utils';

import {
  Container,
  DetailsSection,
  ImageSection,
  PokemonImage,
  Row,
} from './styled';

export function PokemonDetails() {
  const params = useParams({ from: pokemonDetailsRoute.id });

  const { isLoading, pokemonDetails: pokemon } = useGetPokemonDetails(
    params.pokemonName
  );

  if (isLoading || !pokemon) return <Spinner />;

  return (
    <Container>
      <ImageSection>
        <Text variant="h4">{capitalize(pokemon.name)}</Text>

        <PokemonImage
          src={pokemon.sprites.other['official-artwork']?.front_default}
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
            <Chip key={type.type.name}>{capitalize(type.type.name)}</Chip>
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
