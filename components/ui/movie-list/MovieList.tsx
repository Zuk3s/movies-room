import ContainerGrid from "../container/ContainerGrid";
import NextLink from "next/link";
import PaginationCustom from "../pagination/PaginationCustom";
import SimpleCard from "../card/Card";
import { MovieResponse } from "@/types";

interface MovieListProps {
  items: ({}) => Promise<MovieResponse>;
}

export async function MovieList({ items }: MovieListProps) {
  const movies = await items({});
  return (
    <section className="flex flex-col gap-16 w-full">
      {movies.results.length > 0 ? (
        <>
          <ContainerGrid>
            {movies.results.map((item) => (
              <NextLink
                href={`/movie/${item.id}`}
                key={item.id}
                className="w-full h-full"
              >
                <SimpleCard movie={item} />
              </NextLink>
            ))}
          </ContainerGrid>
        </>
      ) : (
        <div className="text-center">Nenhum filme encontrado.</div>
      )}
    </section>
  );
}
