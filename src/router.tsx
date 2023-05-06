import { Page } from '@components';
import { PokemonDetails } from '@pages/PokemonDetails';
import { PokemonListPage } from '@pages/PokemonList';
import { Outlet, RootRoute, Route, Router } from '@tanstack/router';
import { z } from 'zod';

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

const pokemonSearchSchema = z
  .object({
    pageSize: z.union([z.literal(10), z.literal(20), z.literal(50)]),
    offset: z.number(),
    searchText: z.string(),
    searchBy: z.union([z.literal('name'), z.literal('ability')]),
    sortBy: z.union([
      z.literal('name'),
      z.literal('height'),
      z.literal('weight'),
    ]),
    sortOrder: z.union([z.literal('ascending'), z.literal('descending')]),
  })
  .partial();

export type PokemonSearchSchema = z.infer<typeof pokemonSearchSchema>;

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
