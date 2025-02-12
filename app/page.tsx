import {
  fetchUpComingMovies,
  fetchPopularMovies,
  fetchNowPlayingMovies,
} from "./api/movies";

import CarrouselContainer from "@/components/container/CarrouselContainer";
import Container from "@/components/container/Container";

export default async function Home() {
  const [upComing, popular, nowPlaying] = await Promise.all([
    fetchUpComingMovies(),
    fetchPopularMovies(),
    fetchNowPlayingMovies(),
  ]);

  return (
    <Container className="py-6 space-y-16">
      <CarrouselContainer list={popular} title="Populares" />
      <CarrouselContainer list={nowPlaying} title="Nos Cinemas" />
      <CarrouselContainer list={upComing} title="Em Breve" />
    </Container>
  );
}
