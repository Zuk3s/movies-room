import { Movie } from "@/types";
import Container from "./container";
import Image from "next/image";

export default function CarrouselContainer({
  list,
  title,
}: {
  list: Movie[];
  title: string;
}) {
  return (
    <Container hasMaxWidth={false}>
      <h1 className="text-2xl">{title}</h1>
      <div className="flex gap-6 overflow-x-auto pb-6 pt-4">
        {list.map((movie) => (
          <Image
            key={movie.id}
            className="object-cover rounded-lg shadow-lg h-auto w-auto"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={200}
            height={248}
          />
        ))}
      </div>
    </Container>
  );
}
