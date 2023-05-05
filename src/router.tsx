import { Page } from '@components';
import { PokemonDetails } from '@pages/PokemonDetails';
import { PokemonListPage } from '@pages/PokemonList';
import { Outlet, RootRoute, Route, Router } from '@tanstack/router';

function Root() {
  return (
    <Page>
      <Outlet />
    </Page>
  );
}

const rootRoute = new RootRoute({
  component: Root,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: PokemonListPage,
});

export const pokemonDetailsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'pokemon/$pokemonName',
  component: PokemonDetails,
});

const routeTree = rootRoute.addChildren([indexRoute, pokemonDetailsRoute]);

export const router = new Router({ routeTree });

declare module '@tanstack/router' {
  interface Register {
    router: typeof router;
  }
}
