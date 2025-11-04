import "./App.css";
import React, { useState } from "react";
import MovieCard from "./component/MovieCard";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
          },
        };

        let url = "";

        if (query && query.trim() !== "") {
          url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            query
          )}&include_adult=false&language=en-US&page=1`;
        } else {
          url =
            "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
        }

        const response = await fetch(url, options);

        const data = await response.json();

        const filteredMovies = data.results
          ? data.results.filter((movie) => movie.adult === false)
          : [];

        setMovies(filteredMovies);
      } catch (error) {
        console.error("데이터 불러오는 중 오류가 발생했습니다", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [query]);

  return (
    <>
      <div className="App">
        <h1 className="page-title">MovieCard</h1>
        {loading ? (
          <p>로딩중</p>
        ) : (
          <div className="movie-list">
            {movies.length > 0 ? (
              movies.map((movie) => (
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
              ))
            ) : (
              <p>검색 결과가 없습니다.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
