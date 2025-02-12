"use client";

import { Chip } from "@heroui/react";

import { GenreResponse } from "@/types";

export function GenresList({ genres }: { genres: GenreResponse[] }) {
  return (
    <div className="flex flex-wrap justify-center md:justify-start gap-1 sm:gap-2">
      {genres.map((genre) => (
        <Chip
          key={genre.id}
          className=" py-4 text-sm sm:text-base md:px-4 md:py-5"
          color="secondary"
          variant="flat"
        >
          {genre.name}
        </Chip>
      ))}
    </div>
  );
}
