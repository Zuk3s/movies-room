"use client";

import { GenreResponse } from "@/types";
import { Chip } from "@heroui/react";

export function GenresList({ genres }: { genres: GenreResponse[] }) {
  return (
    <div className="flex flex-wrap justify-center md:justify-start gap-1 sm:gap-2">
      {genres.map((genre) => (
        <Chip
          key={genre.id}
          variant="flat"
          color="secondary"
          className=" py-4 text-sm sm:text-base md:px-4 md:py-5"
        >
          {genre.name}
        </Chip>
      ))}
    </div>
  );
}
