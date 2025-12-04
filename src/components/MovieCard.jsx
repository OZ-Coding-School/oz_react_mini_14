import { Link } from "react-router-dom";
import { imageBaseUrl } from "../constants/baseUrls";
import "./MovieCard.css";

function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite && onToggleFavorite();
  };

  return (
    <Link to={`/details/${movie.id}`} className="movie-card-link">
      <div className="movie-card">
        <button
          className={`favorite-icon ${isFavorite ? "active" : ""}`}
          onClick={handleClick}
        >
          {isFavorite ? "💜" : "🤍"}
        </button>
        <div className="movie-card-image-wrap">
          <img
            src={imageBaseUrl + movie.poster_path}
            alt={movie.title}
            className="movie-card-image"
          />
        </div>
        <div className="movie-card-meta">
          <h3 className="movie-card-title">{movie.title}</h3>
          <span>★ {movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
}
export default MovieCard;
