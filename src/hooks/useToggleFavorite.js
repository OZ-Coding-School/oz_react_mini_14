import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks';
import { toggleMovieFavorite } from '@/apis';

function useToggleFavorite() {
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ movieId, title, posterPath, voteAverage, isFavorite }) =>
      toggleMovieFavorite({
        params: { userId, movieId, title, posterPath, voteAverage, isFavorite },
      }),
    onSuccess: () => {
      if (userId)
        queryClient.invalidateQueries({ queryKey: ['favorite', userId] });
    },
  });
}

export default useToggleFavorite;
