// src/components/MovieCard.jsx
import { Link } from "react-router-dom";
import { imageBaseUrl } from "../constants/baseUrls";
import "./MovieCard.css";

function MovieCard({ movie }) {
  return (
    <Link
      to={`/details/${movie.id}`}
      className="movie-card-link"
      aria-label={`${movie.title} 상세 보기`}
    >
      <div className="movie-card">
        <div className="movie-card-image-wrap">
          <img
            src={imageBaseUrl + movie.poster_path}
            alt={movie.title}
            className="movie-card-image"
          />
        </div>

        <div className="movie-card-meta">
          <h3 className="movie-card-title">{movie.title}</h3>
          <span className="movie-card-rating">
            ★ {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
