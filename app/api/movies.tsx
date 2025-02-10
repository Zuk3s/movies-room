"use server";

import { MovieDetailsResponse, MovieResponse, MoviesRequest } from "@/types";
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

export async function fetchMovieQuery({
  query,
}: {
  query: string;
}): Promise<MovieResponse> {
  const response = await api.get(`/search/movie`, {
    params: {
      query,
    },
  });
  return response.data;
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

export async function fetchTrendingMovies(
  time_window: "day" | "week" = "week"
) {
  const response = await api.get(`/trending/movie/${time_window}`);
  return response.data;
}
