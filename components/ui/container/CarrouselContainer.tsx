import Image from "next/image";
import NextLink from "next/link";

import Container from "./Container";

import { Movie } from "@/types";

export default function CarrouselContainer({
  list,
  title,
}: {
  list: Movie[];
  title: string;
}) {
  return (
    <Container hasMaxWidth={false}>
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="overflow-x-auto py-6 ">
        <div className="flex space-x-6">
          {list.map((movie) => (
            <NextLink
              key={movie.id}
              className="flex-shrink-0"
              href={`/movie/${movie.id}`}
            >
              <Image
                alt={movie.title}
                className="object-cover rounded-lg shadow-lg transition-transform h-full hover:scale-105"
                height={300}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path}`}
                width={200}
              />
            </NextLink>
          ))}
        </div>
      </div>
    </Container>
  );
}
