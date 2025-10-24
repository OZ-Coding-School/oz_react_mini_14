import React from "react";

const baseUrl = "https://image.tmdb.org/t/p/w500";

function MovieCard({ title, posterPath, voteAverage }) {
  return (
    <div className="movie-card">
      <div className="poster-box">
        <img
          src={
            posterPath
              ? `${baseUrl}${posterPath}`
              : "https://via.placeholder.com/150x220?text=No+Image"
          }
          alt={title}
        />
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        <p className="movie-rating">평점: {voteAverage.toFixed(1)}</p>
      </div>
    </div>
  );
}
export default MovieCard;
