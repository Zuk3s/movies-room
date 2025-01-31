"use server";

import {
  MovieDetailsResponse,
  MovieResponse,
  MoviesRequest,
  VideoResponse,
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

export async function fetchMovieDetails(
  id: string
): Promise<MovieDetailsResponse> {
  const response = await api.get(`/movie/${id}`);

  return response.data;
}
export async function fetchVideosMovie(id: string): Promise<VideoResponse> {
  const response = await api.get(`/movie/${id}/videos`);

  return response.data;
}

export async function fetchTrendingMoviesData(
  time_window: "day" | "week" = "week"
) {
  const response = await api.get(`/trending/movie/${time_window}`);
  return response.data;
}
