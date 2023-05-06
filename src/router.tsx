import { pokemonSearchSchema } from '@api/queries/search-pokemon-schema';
import { Page } from '@components/page';
import { PokemonDetails } from '@pages/pokemon-details';
import { PokemonListPage } from '@pages/pokemon-list';
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

export const pokemonListRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: PokemonListPage,
  validateSearch: pokemonSearchSchema,
});

export const pokemonDetailsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'pokemon/$pokemonName',
  component: PokemonDetails,
});

const routeTree = rootRoute.addChildren([
  pokemonListRoute,
  pokemonDetailsRoute,
]);

export const router = new Router({ routeTree });

declare module '@tanstack/router' {
  interface Register {
    router: typeof router;
  }
}
