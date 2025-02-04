"use server";

import {
  MovieDetailsResponse,
  MovieResponse,
  MoviesRequest,
} from "@/types";
import api from ".";

export async function fetchMovies({
  ...params
}: MoviesRequest): Promise<MovieResponse> {
  const response = await api.get(`/discover/movie`, {
    params: {
      ...params,
    },
  });
  return response.data;
}

{
  /*
  - Adicionar o APPEND_TO_RESPOSNE, com as propriedades, "similar,recomendations,videos,release_date", ele precisa ser passado como query params
  - Após isso, apague o fetchVideoMovie, pois ele não será mais necessário. 
  - Também mude o Type Response dessa requisição.
*/
}
export async function fetchMovieDetails(
  id: string
): Promise<MovieDetailsResponse> {
  const response = await api.get(`/movie/${id}`, {
    params: {
      append_to_response: "similar,recommendations,videos,release_dates",
    },
  });

  return response.data;
}

export async function fetchTrendingMoviesData(
  time_window: "day" | "week" = "week"
) {
  const response = await api.get(`/trending/movie/${time_window}`);
  return response.data;
}
