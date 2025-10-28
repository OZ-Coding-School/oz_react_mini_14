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
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjViNzU1ZmYwYzU5MzAwZWU4OWMxYmJlZDViZjlhNyIsIm5iZiI6MTc2MTU1MjA2MC44NCwic3ViIjoiNjhmZjI2YmNjMDlmZTA2NjhiOWZiMzdiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Dl3wSeGEGqLG42l9e_eRywcmejdzLOwU8JDyeN8YoJI",
          },
        };

        fetch("https://api.themoviedb.org/3/authentication", options)
          .then((res) => res.json())
          .then((res) => console.log(res))
          .catch((err) => console.error(err));

        const data = await response.json();
        const filteredMovies = data.results.filter(
          (movie) => movie.adult === false
        );

        setMovies(filteredMovies);
      } catch (error) {
        console.error("데이터 불러오는 중 오류가 발생했습니다", error);

        fetchMovies();
      }
    };
  }, []);

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
