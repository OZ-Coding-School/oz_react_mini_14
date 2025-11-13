import React, { useState, useEffect } from "react";
import MovieCard from "./assets/movieDetailData.json";
import movieListData from "./assets/movieListData.json";

const App = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(movieListData.results);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-10">
      <h1 className="text-2xl font-bold mb-8">🎬 Movie List</h1>
      <div className="grid grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            vote_average={movie.vote_average}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
