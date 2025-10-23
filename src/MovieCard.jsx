import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <div className="MovieCard">
      <Link to="./MovieDetail.jsx">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </Link>
      {movie.title}
      {movie.vote_average}
    </div>
  );
}
