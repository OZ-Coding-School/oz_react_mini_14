import { useCallback, useMemo } from 'react';
import { useAuth } from '@/hooks';
import useFavoriteMovies from '@/hooks/favorite/useFavoriteMovies';
import useToggleFavorite from '@/hooks/favorite/useToggleFavorite';

function useFavoriteController() {
  const { userId } = useAuth();
  const { data: favoriteMovies, isLoading, error } = useFavoriteMovies();
  const { mutate } = useToggleFavorite();
  const isFavoriteEnabled = !!userId;
  const favoriteMovieIds = useMemo(
    () => new Set(favoriteMovies?.map((item) => item.id)),
    [favoriteMovies],
  );

  const onFavoriteClick = useCallback(
    ({ movieId, title, posterPath, voteAverage, isFavorite }) => {
      if (isFavoriteEnabled)
        mutate({ movieId, title, posterPath, voteAverage, isFavorite });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isFavoriteEnabled],
  );

  return {
    favoriteMovies,
    isLoading,
    error,
    isFavoriteEnabled,
    favoriteMovieIds,
    onFavoriteClick,
  };
}

export default useFavoriteController;
