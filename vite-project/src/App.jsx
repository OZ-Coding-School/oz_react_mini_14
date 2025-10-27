import { useState } from "react";
import movieListData from "./movieListData.json";
import MovieCard from "./MovieCard";
import "./App.css";

function App() {
  const [movies] = useState(movieListData.results);

  return (
    <div className="movie-list">
      <h1>Movie List</h1>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default App;
