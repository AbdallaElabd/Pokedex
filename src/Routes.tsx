import { Page } from "@components";
import { PokemonDetails } from "@pages/PokemonDetails";
import { PokemonList } from "@pages/PokemonList";
import { PokedexProvider } from "@providers/Pokedex";
import { Route, Routes } from "react-router-dom";

export function AppRoutes() {
  return (
    <Page>
      <Routes>
        <Route
          path="/"
          element={
            <PokedexProvider>
              <PokemonList />
            </PokedexProvider>
          }
        />
        <Route path="pokemon/:pokemonName" element={<PokemonDetails />} />
      </Routes>
    </Page>
  );
}
