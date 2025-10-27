import MovieCard from '@/components/MovieCard';

function MovieList({ movieList }) {
  return (
    <section className="flex flex-wrap justify-center gap-3 py-8">
      {movieList.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </section>
  );
}

export default MovieList;
