import Image from "next/image";
import { notFound } from "next/navigation";

import { fetchMovieDetails, fetchMovies } from "@/app/api/movies";
import CarrouselContainer from "@/components/ui/Container/CarrouselContainer";
import Container from "@/components/ui/Container/Container";
import { GenresList } from "@/components/ui/details/genres/GenresList";
import MovieTrailer from "@/components/ui/Trailer/Trailer";
import { formatDate, formatRuntime } from "@/libs/utils/utils";
import { MovieResponse } from "@/types";
import Overview from "@/components/ui/details/overview/Overview";

async function getMovie(id: string) {
  const movie = await fetchMovieDetails(id);

  if (!movie) notFound();

  return { movie };
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
    description: movie.overview,
    openGraph: {
      title: movie.title,
      description: movie.overview,
      image: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { movie } = await getMovie(id);

  const duration = await formatRuntime(movie.runtime);
  const date = await formatDate(movie.release_date);

  return (
    <section className="w-full flex flex-col gap-16">
      <div className="-mt-12 relative grid place-items-center h-56 md:h-70 lg:h-96 overflow-hidden">
        <h1 className="text-4xl mt-10 sm:text-6xl lg:text-7xl text-center text-white/80 z-10">
          {movie.title}
        </h1>
        {movie.backdrop_path && (
          <Image
            alt={movie.title}
            className="absolute left-0 w-full h-full object-cover filter brightness-50"
            height={400}
            loading="lazy"
            src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
            width={3000}
          />
        )}
      </div>
      <Container className="flex flex-col gap-16 w-full">
        <div className="flex flex-col md:flex-row gap-10">
          {movie.poster_path && (
            <div className="mx-auto flex justify-center w-full min-w-80 sm:w-1/3 md:w-1/4">
              <Image
                alt={movie.title}
                className="object-cover rounded-3xl shadow-lg h-auto w-auto"
                height={450}
                loading="lazy"
                src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`}
                width={300}
              />
            </div>
          )}

          <div className="flex flex-col gap-8 md:w-2/3">
            <GenresList genres={movie.genres} />

            <Overview
              date={date}
              duration={duration}
              voteAverage={movie.vote_average}
              voteCount={movie.vote_count}
            />

            <div>
              <h2 className="text-xl sm:text-xl mb-4 text-default-800">
                Sobre o filme:
              </h2>
              <p className="sm:text-lg text-default-500">{movie.overview}</p>
            </div>

            {movie.tagline && (
              <i className="text-lg text-center">{`"${movie.tagline}"`}</i>
            )}
          </div>
        </div>

        {movie.videos.results.length > 0 && (
          <MovieTrailer videos={movie.videos.results} />
        )}

        {movie.recommendations.results.length > 0 && (
          <CarrouselContainer
            list={movie.recommendations.results}
            title="Recomendados"
          />
        )}

        {movie.similar.results.length > 0 && (
          <CarrouselContainer list={movie.similar.results} title="Similares" />
        )}
      </Container>
    </section>
  );
}
