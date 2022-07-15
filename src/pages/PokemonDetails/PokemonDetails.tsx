import { useGetPokemonDetails } from "@api/pokemonDetails";
import { useParams } from "react-router-dom";
import { Spinner } from "@ui";

export const PokemonDetails = () => {
  const { pokemonName } = useParams();

  const { isLoading, data } = useGetPokemonDetails(pokemonName);

  console.log(data);

  if (isLoading || !data) return <Spinner />;

  return (
    <div>
      <h2>{data?.name}</h2>
    </div>
  );
};
