import "./MovieList.css";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

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
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
    );

    const data = await res.json();
    const filtered = data.results.filter((m) => m.adult === false);
    setMovies(filtered);
    setLoading(false);
  };

  const searchMovies = async () => {
    setLoading(true);
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&language=ko-KR`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
    );

    const data = await res.json();
    const filtered = data.results?.filter((m) => m.adult === false) || [];
    setMovies(filtered);
    setLoading(false);
  };

  useEffect(() => {
    if (query.length > 0) {
      searchMovies();
    } else {
      fetchPopular();
    }
  }, [query]);

  return (
    <div className="movie-list-page">
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movie-list">
          {movies.map((movie) => (
            <Link key={movie.id} to={`/detail/${movie.id}`}>
              <MovieCard
                poster={`${baseUrl}${movie.poster_path}`}
                title={movie.title}
                rating={movie.vote_average?.toFixed(1)}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;
