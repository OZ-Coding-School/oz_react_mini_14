import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import "./MovieList.css";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const baseUrl = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
          }
        );

        const data = await res.json();
        console.log("TMDB 전체 데이터:", data);

        const filtered = data.results.filter((movie) => movie.adult === false);
        setMovies(filtered);
      } catch (error) {
        console.error("API 오류:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <Link key={movie.id} to={`/detail/${movie.id}`}>
          <MovieCard
            poster={`${baseUrl}${movie.poster_path}`}
            title={movie.title}
            rating={movie.vote_average.toFixed(1)}
          />
        </Link>
      ))}
    </div>
  );
};

export default MovieList;
