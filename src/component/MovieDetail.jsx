import React, { useState } from "react";
import movieDetailData from "../data/movieDetailData.json";
import "./MovieDetail.css";

const baseUrl = "https://image.tmdb.org/t/p/w500";

function MovieDetail() {
  const [movie] = useState(movieDetailData);

  return (
    <div className="movie-detail">
      <div
        className="backdrop"
        style={{
          backgroundImage: `url(${baseUrl}${
            movie.backdrop_path || movie.poster_path
          })`,
        }}
      >
        <div className="overlay">
          <h1 className="movie-title">{movie.title}</h1>
          <p className="movie-tagline">{movie.tagline}</p>
        </div>
      </div>

      <div className="detail-content">
        <div className="poster-box">
          <img
            src={
              movie.poster_path
                ? `${baseUrl}${movie.poster_path}`
                : "https://via.placeholder.com/300x450?text=No+Image"
            }
            alt={movie.title}
          />
        </div>

        <div className="info-box">
          <p className="rating">⭐ 평점: {movie.vote_average.toFixed(1)}</p>
          <p className="genres">
            장르: {movie.genres && movie.genres.map((g) => g.name).join(", ")}
          </p>
          <p className="overview">{movie.overview}</p>
          <p className="release">개봉일: {movie.release_date}</p>
          <p className="runtime">상영 시간: {movie.runtime}분</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
