import { createContext, useState, useContext } from "react";
import { fetchPopularMovies } from "../api/tmdb";

const MovieDetail = createContext();

export function MovieDetailProvider({ children }) {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <MovieDetail.Provider
      value={{
        selectedMovie,
        setSelectedMovie,
      }}
    >
      {children}
    </MovieDetail.Provider>
  );
}

export function useMovieDetail() {
  return useContext(MovieDetail);
}
