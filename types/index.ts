import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type MoviesRequest = {
  page?: number;
  sort_by?: string;
  with_genres?: string;
};

export type MovieResponse = {
  page: number;
  results: Array<{
    adult: boolean;
    backdrop_path: string;
    id: number;
    title: string;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string;
    media_type: string;
    genre_ids: number[];
    popularity: number;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }>;
  total_pages: number;
  total_results: number;
};

export type GenreResponse = {
  id: number;
  name: string;
};
