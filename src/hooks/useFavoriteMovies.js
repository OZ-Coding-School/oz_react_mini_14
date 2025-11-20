import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks';
import { getFavoriteMovieList } from '@/apis';

function useFavoriteMovies() {
  const { userId } = useAuth();

  return useQuery({
    queryKey: ['favorite', userId],
    queryFn: () => getFavoriteMovieList({ params: { userId } }),
  });
}

export default useFavoriteMovies;
