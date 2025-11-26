import "./MovieCard.css";

function MovieCard({ poster, title, rating }) {
  return (
    <div className="movie-card">
      <img src={poster} className="movie-poster" alt={title} />

      <div className="movie-title">{title}</div>
      <div className="movie-rating">⭐ {rating}</div>
    </div>
  );
}

export default MovieCard;
