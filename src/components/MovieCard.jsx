import { Link } from "react-router-dom";
import { imageBaseUrl } from "../contexts/baseUrls";
import "./MovieCard.css";

function MovieCard({ movie }) {
  return (
    <Link to={`/details/${movie.id}`} className="movie-card-link">
      <div className="movie-card">
        <img src={imageBaseUrl + movie.poster_path} alt={movie.title} />
        <h3 className="movie-card-title">{movie.title}</h3>
      </div>
    </Link>
  );
}

export default MovieCard;
