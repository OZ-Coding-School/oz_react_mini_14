// 환경변수에서 API 토큰 가져오기
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";

// API 요청 옵션 (헤더 설정)
const options = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

// 인기 영화 목록 가져오기
export const getPopularMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?language=ko-KR`,
      options
    );
    const data = await response.json();

    // adult 값이 false인 영화만 필터링
    return data.results.filter((movie) => !movie.adult);
  } catch (error) {
    console.error("영화 목록 가져오기 실패:", error);
    throw error;
  }
};

// 영화 상세 정보 가져오기
export const getMovieDetail = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?language=ko-KR`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("영화 상세 정보 가져오기 실패:", error);
    throw error;
  }
};
