import { QueryClient } from 'react-query';

export const queryClient = new QueryClient();

export const API_URL = 'https://pokeapi.co/api/v2';

export async function endpoint<T extends unknown>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json() as T;
}
