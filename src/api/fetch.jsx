// fetchData
// api data 불러오기 (tmdb data 전부)

import instance from "./api";

export const fetchData = async (endpoint, extraParams = {}) => {
  try {
    const response = await instance.get(endpoint, { params: extraParams });
    return response.data;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};

// 무한스크롤 - TopRated Movie
export const fetchTopRagedMovies = async ({ pageParam = 1 }) => {
  try {
    const response = await instance.get(`/movie/top_rated`, {
      params: { page: pageParam },
    });

    const data = response.data;

    return {
      results: data.results,
      nextPage: data.page + 1,
      totalPages: data.total_pages,
    };
  } catch (error) {
    console.error("Top Raged 요청 중 오류발생", error);
    throw error;
  }
};

// 무한스크롤 - Similar Movies
export const fetchSimilarMovies = async ({ movieId, pageParam }) => {
  try {
    const response = await instance.get(`/movie/${movieId}/similar`, {
      params: { page: pageParam },
    });

    const data = response.data;

    return {
      results: data.results,
      nextPage: data.page + 1,
      totalPages: data.total_pages,
    };
  } catch (error) {
    console.error("Similar 영화 요청 중 오류 발생", error);
    throw error;
  }
};

// 무한스크롤 - Popular Movie
export const fetchPopularMovies = async ({ pageParam = 1 }) => {
  try {
    const response = await instance.get("/movie/popular", {
      params: { page: pageParam },
    });

    const data = response.data;

    return {
      results: data.results,
      nextPage: data.page + 1,
      totalPages: data.total_pages,
    };
  } catch (error) {
    console.error("Similar 영화 요청 중 오류 발생", error);
    throw error;
  }
};
