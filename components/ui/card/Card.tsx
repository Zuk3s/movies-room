import { CardFooter, CardHeader, Image, Card } from "@heroui/react";
import { StarFilledIcon } from "../../icons";
import { Movie } from "@/types";

interface SimpleCardProps {
  movie: Movie;
}

export default function SimpleCard({ movie }: SimpleCardProps) {
  return (
    <Card isPressable className="h-full w-full">
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
        className="z-0 w-full h-full object-cover min-h-80"
      />
      <CardFooter className="text- place-content-center">
        <h1 className="font-medium md:font-semibold text-sm md-text-base ">
          {movie.title}
        </h1>
      </CardFooter>
    </Card>
  );
}
