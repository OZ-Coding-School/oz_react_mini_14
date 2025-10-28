import { Link } from "react-router-dom";
import "./MovieCard.css";

function MovieCard({ movie }) {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <Link to={`/details/${movie.id}`} className="movie-card">
      {" "}
      {/* movie.id를 URL에 포함 */}
      <div className="movie-card-image-wrapper">
        <img
          src={`${imageBaseUrl}${movie.poster_path}`}
          alt={movie.title}
          className="movie-card-image"
        />
      </div>
      <div className="movie-card-info">
        <h3 className="movie-card-title">{movie.title}</h3>
        <p className="movie-card-rating">⭐ {movie.vote_average.toFixed(1)}</p>
      </div>
    </Link>
  );
}

export default MovieCard;
