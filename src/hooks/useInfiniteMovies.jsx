import { useInfiniteQuery } from "@tanstack/react-query";
import {
  fetchTopRagedMovies,
  fetchSimilarMovies,
  fetchPopularMovies,
} from "@/api";

const ITEMS_PER_PAGE = 18;

//무한스크롤 영화 데이터
const useInfiniteMovies = (type, movieId = null) => {
  return useInfiniteQuery({
    queryKey: movieId ? ["movies", type, movieId] : ["movies", type],

    queryFn: ({ pageParam }) => {
      if (type === "similar" && movieId) {
        return fetchSimilarMovies({ movieId, pageParam });
      }
      if (type === "popular") {
        return fetchPopularMovies({ pageParam });
      }
      return fetchTopRagedMovies({ pageParam });
    },

    getNextPageParam: (lastPage, allPages) => {
      if (allPages.length < lastPage.totalPages) {
        return lastPage.nextPage;
      }
      return undefined;
    },

    select: (data) => ({
      pages: data.pages.map((page) => ({
        ...page,
        results: page.results.slice(0, ITEMS_PER_PAGE),
      })),
      pageParams: data.pageParams,
    }),

    initialPageParam: 1,
  });
};

export default useInfiniteMovies;
