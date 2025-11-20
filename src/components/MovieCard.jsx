import React from "react";
import "./MovieCard.css";

const MovieCard = ({ poster, title, rating }) => {
  return (
    <div className="movie-card">
      <img src={poster} alt={title} className="poster-box" />
      <h3 className="movie-title">{title}</h3>
      <p className="movie-rating">⭐ {rating}</p>
    </div>
  );
};

export default MovieCard;
