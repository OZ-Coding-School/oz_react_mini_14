import { useInfiniteQuery } from "@tanstack/react-query";
import {
  fetchTopRagedMovies,
  fetchSimilarMovies,
  fetchPopularMovies,
} from "@/api/fetch";

//무한스크롤 영화 데이터
// @param { string } type - 'top-rated' 또는 'similar'
// @param {number} movieId - type이 'similar'일 때 필요한 영화 ID

export const useInfiniteMovies = (type, movieId = null) => {
  return useInfiniteQuery({
    // queryKey: 캐시 관리용 고유 키
    queryKey: movieId ? ["movies", type, movieId] : ["movies", type],

    //queryFn: 실제 데이터 가져오는 함수
    queryFn: ({ pageParam }) => {
      if (type === "similar" && movieId) {
        return fetchSimilarMovies({ movieId, pageParam });
      }
      if (type === "popular") {
        return fetchPopularMovies({ pageParam });
      }
      return fetchTopRagedMovies({ pageParam });
    },

    //getNextPageParam: 다음 페이지 번호 결정
    getNextPageParam: (lastPage) => {
      // 다음 페이지가 전체 페이지보다 작거나 같으면 계속
      if (lastPage.nextPage <= lastPage.totalPages) {
        return lastPage.nextPage;
      }
      return undefined;
    },
    // initialPageParam: 첫 페이지 번호
    initialPageParam: 1,
  });
};
