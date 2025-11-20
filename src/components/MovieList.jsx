import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth, useFavoriteMovies } from '@/hooks';
import { toggleMovieFavorite } from '@/apis';
import { Error, Indicator, MovieCard } from '@/components';

function MovieList({ movieList }) {
  const { userId } = useAuth();
  const queryClient = useQueryClient();
  const { data: favoriteMovies, isLoading, error } = useFavoriteMovies();
  const { mutate } = useMutation({
    mutationFn: ({ movieId, title, posterPath, voteAverage, isFavorite }) =>
      toggleMovieFavorite({
        params: { userId, movieId, title, posterPath, voteAverage, isFavorite },
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['favorite', userId] }),
  });
  const favoriteMovieIds = new Set(favoriteMovies?.map((item) => item.id));

  const onFavoriteClick = ({
    movieId,
    title,
    posterPath,
    voteAverage,
    isFavorite,
  }) => mutate({ movieId, title, posterPath, voteAverage, isFavorite });

  if (isLoading) return <Indicator />;
  if (error) return <Error message={error.message} />;
  return (
    <section className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3 p-8 md:grid-cols-[repeat(auto-fill,minmax(216px,1fr))]">
      {movieList?.map((movie, index) => (
        <MovieCard
          key={index}
          movie={movie}
          isFavorite={favoriteMovieIds.has(movie.id)}
          onFavoriteClick={onFavoriteClick}
        />
      ))}
    </section>
  );
}

export default MovieList;
