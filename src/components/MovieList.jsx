import MovieCard from '@/components/MovieCard';

function MovieList({ movieList }) {
  return (
    <section className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3 px-8 py-8">
      {movieList.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </section>
  );
}

export default MovieList;
