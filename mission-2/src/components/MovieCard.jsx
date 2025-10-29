import { useNavigate } from "react-router-dom";
import { useMovieList } from "../context/MovieListData";
import { useMovieDetail } from "../context/MovieDetailData";
import "./MovieCard.css";
import React from "react";

function MovieCard() {
  const { movies } = useMovieList();
  const { setSelectedMovie } = useMovieDetail();
  const navigate = useNavigate();

  const handleCardClick = (movie) => {
    setSelectedMovie(movie);
    navigate(`/movies/${movie.id}`, { state: { movie } });
  };

  if (!movies || movies.length === 0) {
    return <p>영화 데이터를 불러오는 중...</p>;
  }

  return (
    <>
      <div className="movie-list">
        {movies.map((movie) => (
          <section
            key={movie.id}
            className="movie-card"
            onClick={() => handleCardClick(movie)}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <div className="movie-info">
              <h2 className="movie-title">{movie.title}</h2>
              <p className="movie-rating">평점: {movie.vote_average}</p>
              <ul className="movie-genres">
                {movie.genres.map((genre, index) => (
                  <li key={`${movie.id}-${index}`}>{genre}</li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
export default MovieCard;
