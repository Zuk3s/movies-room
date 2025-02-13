"use server";

import { fetchFromApi } from "./index";

import {
  Movie,
  MovieDetailsResponse,
  MovieResponse,
  MoviesRequest,
} from "@/types";

const ONE_DAY_IN_SECONDS = 60 * 60 * 24; // 24 horas

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
  return fetchFromApi(
    `/movie/${id}`,
    {
      append_to_response: "similar,recommendations,videos,release_dates",
    },
    ONE_DAY_IN_SECONDS
  );
}

export async function fetchTrendingMovies(
  time_window: "day" | "week" = "week"
): Promise<MovieResponse> {
  return fetchFromApi(`/trending/movie/${time_window}`);
}

export async function fetchUpComingMovies(): Promise<Movie[]> {
  const data: MovieResponse = await fetchFromApi(
    "/movie/upcoming",
    {},
    ONE_DAY_IN_SECONDS
  );
  return data.results;
}

export async function fetchPopularMovies(): Promise<Movie[]> {
  const data: MovieResponse = await fetchFromApi(
    "/movie/popular",
    {},
    ONE_DAY_IN_SECONDS
  );
  return data.results;
}

export async function fetchNowPlayingMovies(): Promise<Movie[]> {
  const data: MovieResponse = await fetchFromApi(
    "/movie/now_playing",
    {},
    ONE_DAY_IN_SECONDS
  );
  return data.results;
}
