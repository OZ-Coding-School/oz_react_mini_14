import "./App.css";
import React, { useState } from "react";
import MovieCard from "./component/MovieCard";
import movieListData from "./data/movieListData.json";
import MovieDetail from "./component/MovieDetail";

function App() {
  const [movies] = useState(movieListData.results);
  return (
    <>
      <div className="App">
        <h1 className="page-title">MovieCard</h1>
        <div className="movie-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
              voteAverage={movie.vote_average}
            />
          ))}
        </div>
      </div>
      <MovieDetail />
    </>
  );
}

export default App;
