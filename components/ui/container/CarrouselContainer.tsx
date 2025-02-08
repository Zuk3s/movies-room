import { Movie } from "@/types";
import Container from "./Container";
import Image from "next/image";
import NextLink from "next/link";

export default function CarrouselContainer({
  list,
  title,
}: {
  list: Movie[];
  title: string;
}) {
  const {} = list;
  return (
    <Container hasMaxWidth={false}>
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="overflow-x-auto py-6 ">
        <div className="flex space-x-6">
          {list.map((movie) => (
            <NextLink
              href={`/movie/${movie.id}`}
              key={movie.id}
              className="flex-shrink-0"
            >
              <Image
                className="object-cover rounded-lg shadow-lg transition-transform h-full hover:scale-105"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={200}
                height={300}
              />
            </NextLink>
          ))}
        </div>
      </div>
    </Container>
  );
}
