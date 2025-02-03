"use client";
import PaginationCustom from "@/components/pagination-movies";
import { GenreResponse, MovieResponse, MoviesRequest } from "@/types";
import { Button } from "@heroui/button";
import { Select, Selection, SelectItem } from "@heroui/react";
import { useEffect, useState } from "react";
import { fetchMovies } from "../api/movies";
import Container from "@/components/Container/container";
import ContainerGrid from "@/components/Container/container-grid";
import SimpleCard from "@/components/Card/card";
import NextLink from "next/link";

interface MoviesClientProps {
  initialGenres: GenreResponse[];
  initialMovies: MovieResponse;
}

export default function MovieContent({
  initialGenres,
  initialMovies,
}: MoviesClientProps) {
  const [movies, setMovies] = useState<MovieResponse>(initialMovies);
  const [selectedGenres, setSelectedGenres] = useState<Selection>(new Set([]));
  const [sortBy, setSortBy] = useState<string>("popularity.desc");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleClear = () => {
    setSelectedGenres(new Set([]));
  };

  useEffect(() => {
    const params: MoviesRequest = {
      page: currentPage,
      sort_by: sortBy,
      with_genres: Array.from(selectedGenres).join(", "),
    };

    async function fetchMoviesData() {
      const movies = await fetchMovies(params);
      setMovies(movies);
    }

    fetchMoviesData();
  }, [selectedGenres, sortBy, currentPage]);

  return (
    <Container className="flex flex-col gap-16 pt-16">
      <section className="flex flex-col md:flex-row md:justify-end md:items-center gap-4 w-full">
        <Select
          className="md:max-w-xs"
          label="Ordenar por"
          selectedKeys={new Set([sortBy])}
          onSelectionChange={(keys) => setSortBy(Array.from(keys)[0] as string)}
          size="md"
          variant="bordered"
        >
          <SelectItem key="popularity.desc">Mais populares</SelectItem>
          <SelectItem key="vote_average.desc">Melhor avaliados</SelectItem>
          <SelectItem key="release_date.desc">Lançados recentemente</SelectItem>
          <SelectItem key="vote_count.desc">Mais avaliados</SelectItem>
        </Select>
        <Select
          className="md:w-60"
          label="Gêneros"
          placeholder="Selecione o gênero"
          selectionMode="multiple"
          selectedKeys={new Set(selectedGenres)}
          onSelectionChange={setSelectedGenres}
          items={initialGenres}
          variant="bordered"
        >
          {(genre) => <SelectItem key={genre.id}>{genre.name}</SelectItem>}
        </Select>
        <Button
          size="lg"
          onPress={handleClear}
          color="secondary"
          isDisabled={Array.from(selectedGenres).length === 0}
        >
          Limpar Filtros
        </Button>
      </section>
      <section className="flex flex-col gap-16 w-full">
        {movies?.results.length > 0 ? (
          <>
            <ContainerGrid>
              {movies.results.map((movie) => (
                <NextLink
                  href={`/movie/${movie.id}`}
                  key={movie.id}
                  className="w-full h-full"
                >
                  <SimpleCard movie={movie} />
                </NextLink>
              ))}
            </ContainerGrid>
            <PaginationCustom
              currentPage={currentPage}
              totalPages={movies.total_pages > 500 ? 500 : movies.total_pages}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <div>Nenhum filme encontrado.</div>
        )}
      </section>
    </Container>
  );
}
