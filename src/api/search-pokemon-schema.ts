import { z } from 'zod';

export const pokemonSearchSchema = z.object({
  pageSize: z.union([z.literal(10), z.literal(20), z.literal(50)]).catch(10),
  offset: z.number().catch(0),
  searchText: z.string().catch(''),
  searchBy: z.union([z.literal('name'), z.literal('ability')]).catch('name'),
  sortBy: z
    .union([z.literal('name'), z.literal('height'), z.literal('weight')])
    .catch('name'),
  sortOrder: z
    .union([z.literal('ascending'), z.literal('descending')])
    .catch('ascending'),
});

export type PokemonSearchSchema = z.infer<typeof pokemonSearchSchema>;
