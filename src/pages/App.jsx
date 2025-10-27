import { useState } from "react";
import movieListData from "../data/movieListData.json";
import MovieCard from "../components/MovieCard";
import "./App.css";

function App() {
  const [movies] = useState(movieListData.results);

  return (
    <div className="app-container">
      <h1 className="app-title">인기 영화</h1>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default App;
