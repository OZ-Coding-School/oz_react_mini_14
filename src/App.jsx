import "./App.css";
import React, { useState } from "react";
import MovieCard from "./component/MovieCard";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
          },
        };

        const response = await fetch(
          "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
          options
        );

        const data = await response.json();

        const filteredMovies = data.results.filter(
          (movie) => movie.adult === false
        );

        setMovies(filteredMovies);
      } catch (error) {
        console.error("데이터 불러오는 중 오류가 발생했습니다", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <>
      <div className="App">
        <h1 className="page-title">MovieCard</h1>
        <div className="movie-list">
          {movies.map((movie) => (
            <Link
              to={`/details/${movie.id}`}
              key={movie.id}
              className="movie-link"
            >
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
