// src/pages/MovieList.jsx
import "./MovieList.css";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import MovieSwiper from "../components/MovieSwiper";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;
  const baseUrl = "https://image.tmdb.org/t/p/w500";

  const fetchPopular = async () => {
    setLoading(true);
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=ko-KR",
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
    );

    const data = await res.json();
    setMovies(data.results.filter((m) => !m.adult));
    setLoading(false);
  };

  const searchMovies = async () => {
    setLoading(true);
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&language=ko-KR`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
    );

    const data = await res.json();
    setMovies((data.results || []).filter((m) => !m.adult));
    setLoading(false);
  };

  useEffect(() => {
    if (query.trim()) searchMovies();
    else fetchPopular();
  }, [query]);

  return (
    <div className="movie-list-page">
      <div className="page-header">
        <h2>🎬 Explore Your Next Favorite Movie</h2>
        <p>최고 인기 영화들을 지금 만나보세요!</p>
      </div>

      <MovieSwiper />

      <h2 className="section-title">🎬 All Movies</h2>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
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
      )}
    </div>
  );
};

export default MovieList;
