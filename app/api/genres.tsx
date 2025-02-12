import { GenreResponse } from "@/types";
import { fetchFromApi } from "./index";

export async function fetchGenres(): Promise<GenreResponse[]> {
  const data = await fetchFromApi("/genre/movie/list");

  return data.genres;
}
