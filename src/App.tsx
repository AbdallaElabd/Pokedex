import { queryClient } from '@api/api';
import { Page } from '@components';
import { PokemonDetails } from '@pages/PokemonDetails';
import { PokemonList } from '@pages/PokemonList';
import { GlobalStyle } from '@styles/GlobalStyle';
import React from 'react';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={(
              <Page title="Pokémon List">
                <PokemonList />
              </Page>
            )}
          />
          <Route
            path="pokemon/:pokemonName"
            element={(
              <Page title="Pokémon Details">
                <PokemonDetails />
              </Page>
            )}
          />
        </Routes>
      </BrowserRouter>
      <GlobalStyle />
    </QueryClientProvider>
  );
}

export default App;
