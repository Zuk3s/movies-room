"use server";

import {
  Movie,
  MovieDetailsResponse,
  MovieResponse,
  MoviesRequest,
} from "@/types";
import { fetchFromApi } from "./index";

export async function fetchMovies(
  params: MoviesRequest
): Promise<MovieResponse> {
  return fetchFromApi(`/discover/movie`, params);
}

export async function fetchMovieQuery(query: string): Promise<MovieResponse> {
  return fetchFromApi(`/search/movie`, { query });
}

export async function fetchMovieDetails(
  id: string
): Promise<MovieDetailsResponse> {
  return fetchFromApi(`/movie/${id}`, {
    append_to_response: "similar,recommendations,videos,release_dates",
  });
}

export async function fetchTrendingMovies(
  time_window: "day" | "week" = "week"
): Promise<MovieResponse> {
  return fetchFromApi(`/trending/movie/${time_window}`);
}

export async function fetchUpComingMovies(): Promise<Movie[]> {
  const data: MovieResponse = await fetchFromApi("/movie/upcoming");

  return data.results;
}

export async function fetchPopularMovies(): Promise<Movie[]> {
  const data: MovieResponse = await fetchFromApi("/movie/popular");

  return data.results;
}

export async function fetchNowPlayingMovies(): Promise<Movie[]> {
  const data: MovieResponse = await fetchFromApi("/movie/now_playing");

  return data.results;
}
