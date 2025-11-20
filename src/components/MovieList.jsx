import { MovieCard } from '@/components';

function MovieList({ movieList }) {
  return (
    <section className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3 p-8 md:grid-cols-[repeat(auto-fill,minmax(216px,1fr))]">
      {movieList.map((movie, index) => (
        <MovieCard key={index} movie={movie} isFavorite={true} />
      ))}
    </section>
  );
}

export default MovieList;
