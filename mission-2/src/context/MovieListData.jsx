import { createContext, useContext, useEffect, useState } from "react";
import { fetchPopularMovies } from "../api/tmdb";

const genreMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  18: "Drama",
  27: "Horror",
  53: "Thriller",
  10751: "Family",
  10770: "TV Movie",
  14: "Fantasy",
  878: "Science Fiction",
  36: "History",
  80: "Crime",
  9648: "Mystery",
  10749: "Romance",
  10752: "War",
  37: "Western",
};
const MovieList = createContext();

export function MovieListProvider({ children }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function loadMovies() {
      const movies = await fetchPopularMovies();
      const movieswithGenres = movies.map((movie) => ({
        ...movie,
        genres: movie.genre_ids.map((id) => genreMap[id] || "Unknown"),
      }));
      setMovies(movieswithGenres);
    }
    loadMovies();
  }, []);

  return (
    <MovieList.Provider
      value={{
        movies,
      }}
    >
      {children}
    </MovieList.Provider>
  );
}

export function useMovieList() {
  return useContext(MovieList);
}
