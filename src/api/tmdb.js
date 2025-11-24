const BASE_URL = "https://api.themoviedb.org/3";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
  },
};

//인기 영화 가져오기
export async function fetchPopularMovies(page = 1) {
  try {
    const res = await fetch(
      `${BASE_URL}/movie/popular?language=ko-KR&page=${page}`,
      options
    );

    if (!res.ok) throw new Error("TMDB popular API 요청 실패");

    const data = await res.json();

    //성인영화 제외
    const filteredResults = data.results.filter(
      (movie) => movie.adult === false
    );

    return filteredResults;
  } catch (error) {
    console.error(error);
    return [];
  }
}

//영화 상세 정보
export async function fetchMovieDetails(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}?language=ko-KR`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
    },
  });

  if (!res.ok) throw new Error("TMDB detail API 요청 실패");

  return await res.json();
}

//영화 검색
export async function searchMovies(query) {
  if (!query) return [];

  const res = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(
      query
    )}&language=ko-KR&page=1`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
      },
    }
  );

  if (!res.ok) throw new Error("TMDB search API 요청 실패");

  const data = await res.json();
  return data.results || [];
}
