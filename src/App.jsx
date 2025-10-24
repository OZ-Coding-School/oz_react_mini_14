import "./App.css";
import React, { useState } from "react";
import MovieCard from "./component/MovieCard";
import movieListData from "./data/movieListData.json";
import { Link } from "react-router-dom";

function App() {
  const [movies] = useState(movieListData.results);
  return (
    <>
      <div className="App">
        <h1 className="page-title">MovieCard</h1>
        <div className="movie-list">
          {movies.map((movie) => (
            <Link to="/details" key={movie.id} className="movie-link">
              <MovieCard
                title={movie.title}
                posterPath={movie.poster_path}
                voteAverage={movie.vote_average}
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
