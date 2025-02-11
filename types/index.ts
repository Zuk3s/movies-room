import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type GenreResponse = {
  id: number;
  name: string;
};

export type MoviesRequest = {
  page?: number;
  sort_by?: string;
  with_genres?: string;
};

export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: GenreResponse[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};


export type MovieDetailsResponse = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  } | null;
  budget: number;
  genres: GenreResponse[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  similar: MovieResponse;
  recommendations: MovieResponse;
  videos: {
    results: Video[];
  };
  release_dates: {
    results: {
      iso_3166_1: string;
      release_dates: {
        certification: string;
        iso_639_1: string;
        note: string;
        release_date: string;
        type: number;
      }[];
    }[];
  };
};

export type Video = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: "YouTube" | "Vimeo";
  size: 360 | 480 | 720 | 1080;
  type:
    | "Trailer"
    | "Teaser"
    | "Clip"
    | "Featurette"
    | "Behind the Scenes"
    | "Bloopers";
  official: boolean;
  published_at: string;
  id: string;
};
