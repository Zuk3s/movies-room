import {
  fetchMovieDetails,
  fetchMovies,
  fetchVideosMovie,
} from "@/app/api/movies";
import Container from "@/components/Container/container";
import DynamicImage from "@/components/dynamic-image";
import { StarFilledIcon } from "@/components/icons";
import { GenresList } from "@/components/maps-details";
import MovieTrailer from "@/components/movie-trailer";
import { MovieResponse } from "@/types";
import { Divider } from "@heroui/react";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getMovie(id: string) {
  const [movie, videos] = await Promise.all([
    fetchMovieDetails(id),
    fetchVideosMovie(id),
  ]);
  if (!movie) notFound();
  return { movie, videos };
}

export async function generateStaticParams() {
  const movies: MovieResponse = await fetchMovies({});

  return movies.results.map((movie) => ({
    id: String(movie.id),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { movie } = await getMovie(id);

  return {
    title: movie.title,
  };
}

async function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

async function formatRuntime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { movie, videos } = await getMovie(id);

  return (
    <section className="w-full flex flex-col gap-16">
      <div className="-mt-12 relative grid place-items-center h-56 md:h-70 lg:h-96 overflow-hidden">
        <h1 className="text-4xl mt-10 sm:text-6xl lg:text-7xl text-center text-white/80 z-10">
          {movie.title}
        </h1>
        {movie.backdrop_path && (
          <Image
            src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
            width={3000}
            height={400}
            className="absolute left-0 w-full h-full object-cover filter brightness-50"
            alt={movie.title}
            loading="lazy"
          />
        )}
      </div>
      <Container>
        <div className="flex flex-col md:flex-row gap-10">
          {movie.poster_path && (
            <DynamicImage
              className="mx-auto flex justify-center w-full md:w-1/3"
              imagePath={movie.poster_path}
              alt={movie.title}
            />
          )}

          <div className="flex flex-col gap-10 md:w-2/3">
            <GenresList genres={movie.genres} />

            <div className="flex flex-col gap-3 sm:text-lg ">
              <h2>
                <span className="text-default-500">Lançamento: </span>
                {movie.release_date
                  ? formatDate(movie.release_date)
                  : "desconhecida"}
              </h2>

              <div className="flex gap-4">
                <h2 className="flex items-center gap-1">
                  <span className="text-default-500">Classificação:</span>
                  <StarFilledIcon className="text-yellow-300" />
                  {movie.vote_average.toPrecision(2)}
                </h2>
                <Divider orientation="vertical" />
                <h2>
                  <span className="text-default-500">Votos: </span>
                  {movie.vote_count}
                </h2>
              </div>

              <h2>
                <span className="text-default-500">Duração: </span>
                {formatRuntime(movie.runtime)}
              </h2>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl mb-4 text-default-800">
                Sobre o filme:
              </h2>
              <p className="sm:text-lg text-default-500">{movie.overview}</p>
            </div>
          </div>
        </div>
        {videos.results.length > 0 && <MovieTrailer videos={videos} />}
      </Container>
    </section>
  );
}
