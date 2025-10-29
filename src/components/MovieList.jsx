import MovieCard from '@/components/MovieCard';

function MovieList({ movieList }) {
  return (
    <section className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3 p-8 md:grid-cols-[repeat(auto-fill,minmax(216px,1fr))]">
      {movieList.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </section>
  );
}

export default MovieList;
