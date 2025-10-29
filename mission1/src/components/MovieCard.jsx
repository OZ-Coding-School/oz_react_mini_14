import { useState } from "react";
import { useMovieList } from "../context/MovieListData";
import { useMovieDetail } from "../context/MovieDetailData";
import MovieModal from "./MovieModal";
import "./MovieCard.css";
import React from "react";
// import starIcon from "../assets/star-icon.png";

function MovieCard() {
  const { movies } = useMovieList();
  const { selectedMovie, setSelectedMovie } = useMovieDetail();

  const handleCardClick = (movie) => {
    setSelectedMovie(movie);
  };
  const handleCloseModal = () => {
    setSelectedMovie(null);
  };
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
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </>
  );
}
export default MovieCard;
