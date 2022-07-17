import { Page } from "@components";
import { PokemonDetails } from "@pages/PokemonDetails";
import { PokemonList } from "@pages/PokemonList";
import { Route, Routes } from "react-router-dom";

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Page title="Pokémon List">
            <PokemonList />
          </Page>
        }
      />
      <Route
        path="pokemon/:pokemonName"
        element={
          <Page title="Pokémon Details">
            <PokemonDetails />
          </Page>
        }
      />
    </Routes>
  );
}
