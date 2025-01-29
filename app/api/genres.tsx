import { GenreResponse } from "@/types";
import api from ".";

export async function fetchGenres(): Promise<GenreResponse[]> {
  const response = await api.get("/genre/movie/list");
  return response.data.genres || [];
}
