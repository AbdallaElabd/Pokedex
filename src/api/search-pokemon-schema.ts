import { z } from 'zod';

export const pokemonSearchSchema = z
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
