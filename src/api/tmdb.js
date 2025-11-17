const BASE_URL = "https://api.themoviedb.org/3";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
  },
};

export async function fetchPopularMovies(page = 1) {
  try {
    const res = await fetch(
      `${BASE_URL}/movie/popular?language=kr-KO&page=${page}`,
      options
    );

    if (!res.ok) {
      throw new Error("TMDB API 요청 실패");
    }

    const data = await res.json();

    const filteredResults = data.results.filter(
      (movie) => movie.adult === false
    );

    return filteredResults;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchMovieDetails(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
    },
  });
  return await res.json();
}
export async function searchMovies(query) {
  if (!query) return [];

  const res = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(
      query
    )}language=ko-KR&page=1`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
      },
    }
  );

  const data = await res.json();
  return data.results || [];
}
