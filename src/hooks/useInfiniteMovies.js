import { useInfiniteQuery } from '@tanstack/react-query';
import { getMovieList } from '@/apis';

function useInfiniteMovies() {
  return useInfiniteQuery({
    queryKey: ['movie'],
    queryFn: ({ pageParam }) => getMovieList({ params: { page: pageParam } }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page === lastPage.totalPage ? null : lastPage.page + 1,
  });
}

export default useInfiniteMovies;
