// src/api/tmdb.js

export async function fetchPopularMovies() {
  const res = await fetch("https://api.themoviedb.org/3/movie/popular", {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  });

  const data = await res.json();

  // ✅ adult: false 인 영화만 필터링
  const filtered = data.results.filter((movie) => movie.adult === false);

  return filtered;
}
