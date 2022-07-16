import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./api/api";
import { PokemonList } from "./pages/PokemonList";
import { PokemonDetails } from "./pages/PokemonDetails";
import { Page } from "@components/Page/Page";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
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
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
