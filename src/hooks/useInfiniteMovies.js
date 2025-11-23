import { useInfiniteQuery } from '@tanstack/react-query';
import { getMovieList } from '@/apis';
import { refineMovies } from '@/utils';

function useInfiniteMovies() {
  return useInfiniteQuery({
    queryKey: ['movie'],
    queryFn: ({ pageParam }) => getMovieList({ params: { page: pageParam } }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page === lastPage.totalPage ? null : lastPage.page + 1,
    select: (movieList) => {
      const movieIds = new Set();
      const newPages = movieList.pages.map((page) => ({
        ...page,
        data: refineMovies({ movies: page.data, movieIds }),
      }));

      return { ...movieList, pages: newPages };
    },
  });
}

export default useInfiniteMovies;
