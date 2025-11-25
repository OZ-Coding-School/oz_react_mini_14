import { useFavoriteController } from '@/hooks';
import { Error, Indicator, MovieCard } from '@/components';

function MovieList({ movieList }) {
  const {
    isLoading,
    error,
    isFavoriteEnabled,
    favoriteMovieIds,
    onFavoriteClick,
  } = useFavoriteController();

  if (isLoading) return <Indicator />;
  if (error) return <Error message={error.message} />;
  return (
    <section className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3 p-8 md:grid-cols-[repeat(auto-fill,minmax(216px,1fr))]">
      {movieList?.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isFavoriteEnabled={isFavoriteEnabled}
          isFavorite={favoriteMovieIds.has(movie.id)}
          onFavoriteClick={onFavoriteClick}
        />
      ))}
    </section>
  );
}

export default MovieList;
