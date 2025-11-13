import React, { useState, useEffect } from "react";git a
import movieListData from "./assets/movieListData.json";
import MovieList from "./assets/MovieList";

const App = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(movieListData.results);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-10">
      <h1 className="text-2xl font-bold mb-8">🎬 Movie List</h1>
      <MovieList movies={movies} />        
      </div>
  );
};

export default App;
