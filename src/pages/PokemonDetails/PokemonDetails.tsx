import { useGetPokemonDetails } from '@api/queries';
import { Spinner } from '@components';
import { useParams } from 'react-router-dom';

export const PokemonDetails = () => {
  const { pokemonName } = useParams();

  const { isLoading, pokemonDetails } = useGetPokemonDetails(pokemonName);

  console.log(pokemonDetails);

  if (isLoading || !pokemonDetails) return <Spinner />;

  return (
    <div>
      <h2>{pokemonDetails?.name}</h2>
    </div>
  );
};
