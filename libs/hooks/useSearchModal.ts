"use client";

import type { MovieResponse } from "@/types";

import { useState, useEffect } from "react";

import { fetchMovieQuery, fetchTrendingMovies } from "@/app/api/movies";

export function useSearchMovies(query: string) {
  const [movies, setMovies] = useState<MovieResponse["results"]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setError(null);

      try {
        let data: MovieResponse;

        if (query) {
          data = await fetchMovieQuery(query);
        } else {
          data = await fetchTrendingMovies();
        }
        setMovies(data.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    };

    const debounceTimer = setTimeout(fetchMovies, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  return { movies, error };
}
