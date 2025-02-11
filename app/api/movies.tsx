"use server";

import {
  Movie,
  MovieDetailsResponse,
  MovieResponse,
  MoviesRequest,
} from "@/types";

const BASE_URL = "https://api.themoviedb.org/3";
const DEFAULT_PARAMS = {
  language: "pt-BR",
};

async function fetchFromApi(
  endpoint: string,
  params: Record<string, any> = {}
): Promise<any> {
  const url = new URL(`${BASE_URL}${endpoint}`);
  Object.entries({ ...DEFAULT_PARAMS, ...params }).forEach(([key, value]) =>
    url.searchParams.append(key, value)
  );

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN_TMDB}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Error fetching data: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

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
  const data = await fetchFromApi("/movie/upcoming");
  return data.results;
}

export async function fetchPopularMovies(): Promise<Movie[]> {
  const data = await fetchFromApi("/movie/popular");
  return data.results;
}

export async function fetchNowPlayingMovies(): Promise<Movie[]> {
  const data = await fetchFromApi("/movie/now_playing");
  return data.results;
}
