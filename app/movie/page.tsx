import { fetchMovies } from "../api/movies";
import { fetchGenres } from "../api/genres";

import MovieContent from "./client-side";

async function getData() {
  const [initialMovies, initialGenres] = await Promise.all([
    fetchMovies({}),
    fetchGenres(),
  ]);

  return { initialGenres, initialMovies };
}

export default async function MoviesPage() {
  const { initialGenres, initialMovies } = await getData();

  return (
    <MovieContent initialGenres={initialGenres} initialMovies={initialMovies} />
  );
}
