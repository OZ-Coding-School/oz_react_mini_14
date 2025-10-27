import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/detail");
  };
  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        onClick={handleClick}
      />
      <h2>{movie.title}</h2>
      <p>평점: {movie.vote_average}</p>
    </div>
  );
}

export default MovieCard;
