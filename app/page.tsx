import CarrouselContainer from "@/components/ui/Container/CarrouselContainer";
import Container from "@/components/ui/Container/Container";
import {
  fetchUpComingMovies,
  fetchPopularMovies,
  fetchNowPlayingMovies,
} from "./api/movies";

export default async function Home() {
  const [upComing, popular, nowPlaying] = await Promise.all([
    fetchUpComingMovies(),
    fetchPopularMovies(),
    fetchNowPlayingMovies(),
  ]);

  return (
    <Container className="py-6 space-y-16">
      <CarrouselContainer title="Populares" list={popular} />
      <CarrouselContainer title="Nos Cinemas" list={nowPlaying} />
      <CarrouselContainer title="Em Breve" list={upComing} />
    </Container>
  );
}
