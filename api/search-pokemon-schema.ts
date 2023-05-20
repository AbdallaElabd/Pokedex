import { z } from "zod";

export const pokemonSearchSchema = z.object({
  pageSize: z
    .string()
    .refine((value) => ["10", "20", "50"].includes(value))
    .catch("10")
    .transform((value) => parseInt(value, 10)),
  offset: z.coerce.number().catch(0),
  searchText: z.string().catch(""),
  searchBy: z.union([z.literal("name"), z.literal("ability")]).catch("name"),
  sortBy: z
    .union([z.literal("name"), z.literal("height"), z.literal("weight")])
    .catch("name"),
  sortOrder: z
    .union([z.literal("ascending"), z.literal("descending")])
    .catch("ascending"),
});

export type PokemonSearchSchema = z.infer<typeof pokemonSearchSchema>;

export const updatePokemonSearchParams = (
  searchParams: URLSearchParams,
  values: [string, string][]
) => {
  const { sortBy, sortOrder, searchText, searchBy, offset, pageSize } =
    pokemonSearchSchema.parse(searchParams);

  const params = new URLSearchParams();
  params.set("pageSize", `${pageSize}`);
  params.set("offset", `${offset}`);
  params.set("searchText", searchText);
  params.set("searchBy", searchBy);
  params.set("sortBy", sortBy);
  params.set("sortOrder", sortOrder);
  for (const [name, value] of values) {
    params.set(name, value);
  }
  return params.toString();
};
