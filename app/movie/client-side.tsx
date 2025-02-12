"use client";

import { Button } from "@heroui/button";
import { Select, Selection, SelectItem } from "@heroui/react";
import { SharedSelection } from "@heroui/system";
import { useState } from "react";
import NextLink from "next/link";

import { fetchMovies } from "../api/movies";

import { GenreResponse, MovieResponse, MoviesRequest } from "@/types";
import Container from "@/components/container/Container";
import ContainerGrid from "@/components/container/ContainerGrid";
import PaginationCustom from "@/components/pagination/PaginationCustom";
import { SimpleCard } from "@/components/card";

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

  const handleSortChange = (keys: SharedSelection) => {
    const newSortBy = Array.from(keys)[0] as string;

    setSortBy(newSortBy);
    setCurrentPage(1);
    handleFetchMovies(newSortBy, selectedGenres, 1);
  };

  const handleGenreChange = (keys: SharedSelection) => {
    setSelectedGenres(keys);
    setCurrentPage(1);
    handleFetchMovies(sortBy, keys, 1);
  };

  const handleFetchMovies = async (
    updatedSortBy: string = sortBy,
    updatedGenres: Selection = selectedGenres,
    updatedPage: number = currentPage
  ) => {
    const params: MoviesRequest = {
      page: updatedPage,
      sort_by: updatedSortBy,
      with_genres: Array.from(updatedGenres).join(", "),
    };
    const movies = await fetchMovies(params);

    setMovies(movies);
  };

  return (
    <Container className="flex flex-col gap-16 pt-16">
      <section className="flex flex-col md:flex-row md:justify-end md:items-center gap-4 w-full">
        <Select
          className="md:max-w-xs"
          label="Ordenar por"
          selectedKeys={new Set([sortBy])}
          variant="bordered"
          onSelectionChange={handleSortChange}
        >
          <SelectItem key="popularity.desc">Mais populares</SelectItem>
          <SelectItem key="vote_average.desc">Melhor avaliados</SelectItem>
          <SelectItem key="vote_count.desc">Mais avaliados</SelectItem>
        </Select>
        <Select
          className="md:w-60"
          items={initialGenres}
          label="Gêneros"
          placeholder="Selecione o gênero"
          selectedKeys={new Set(selectedGenres)}
          selectionMode="multiple"
          variant="bordered"
          onSelectionChange={handleGenreChange}
        >
          {(genre) => <SelectItem key={genre.id}>{genre.name}</SelectItem>}
        </Select>
        <Button
          color="secondary"
          isDisabled={Array.from(selectedGenres).length === 0}
          size="lg"
          onPress={() => {
            setSelectedGenres(new Set([]));
            setSortBy("popularity.desc");
            setCurrentPage(1);
            handleFetchMovies("popularity.desc", new Set([]), 1);
          }}
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
                  key={movie.id}
                  className="w-full h-full"
                  href={`/movie/${movie.id}`}
                >
                  <SimpleCard movie={movie} />
                </NextLink>
              ))}
            </ContainerGrid>
            <PaginationCustom
              currentPage={currentPage}
              totalPages={movies.total_pages > 500 ? 500 : movies.total_pages}
              onPageChange={(page) => {
                setCurrentPage(page);
                handleFetchMovies(sortBy, selectedGenres, page);
              }}
            />
          </>
        ) : (
          <div className="text-center">Nenhum filme encontrado.</div>
        )}
      </section>
    </Container>
  );
}
