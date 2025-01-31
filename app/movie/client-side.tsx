"use client";
import { StarFilledIcon } from "@/components/icons";
import PaginationCustom from "@/components/pagination-movies";
import { GenreResponse, MovieResponse, MoviesRequest } from "@/types";
import { Button } from "@heroui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  Image,
  Select,
  Selection,
  SelectItem,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchMovies } from "../api/movies";
import Container from "@/components/container";

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

  const router = useRouter();

  const handleClear = () => {
    setSelectedGenres(new Set([]));
  };

  const handleCardClick = (movieId: number) => {
    router.push(`/movie/${movieId}`);
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
              {movies.results.map((movie) => (
                <Card
                  key={movie.id}
                  isPressable
                  onPress={() => handleCardClick(movie.id)}
                >
                  <CardHeader className="absolute z-20 top-2 right-2 flex items-center gap-1.5 backdrop-blur-md bg-default-400/30 w-fit py-1 rounded-lg">
                    <StarFilledIcon className="text-yellow-300" />
                    <p className="text-zinc-50/95 text-sm md:text-base pointer-events-none">
                      {movie.vote_average.toPrecision(2)}
                    </p>
                  </CardHeader>
                  <Image
                    removeWrapper
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="z-0 w-full h-full object-cover min-h-72"
                  />
                  <CardFooter className="text- place-content-center">
                    <h1 className="font-medium md:font-semibold text-sm md-text-base ">
                      {movie.title}
                    </h1>
                  </CardFooter>
                </Card>
              ))}
            </div>
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
