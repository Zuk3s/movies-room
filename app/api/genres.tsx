import { fetchFromApi } from "./index";

import { GenreResponse } from "@/types";

export async function fetchGenres(): Promise<GenreResponse[]> {
  const data = await fetchFromApi("/genre/movie/list");

  return data.genres;
}
