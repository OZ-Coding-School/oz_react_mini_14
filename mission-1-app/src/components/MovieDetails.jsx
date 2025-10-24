// import { useParams } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./MovieDetails.css";

const MovieDetails = () => {
  const [movie, setMovie] = useState([]);
  // const { id } = useParams(); // 클릭한 영화 ID
  // const { state: movie } = useLocation(); // MovieCard에서 전달한 객체 //

  // if (!movie?.poster_path) return null;
  useEffect(() => {
    fetch("/data/movieDetailData.json")
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((err) => console.error(err));
  }, []);

  if (!movie?.poster_path) return null;

  return (
    <div className="container">
      <div className="movie__poster">
        <img
          id={movie.id}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.name || movie.title}
        />
      </div>
      <div className="content__wrap">
        <h1 className="movie__title">{movie.title}</h1>
        <p className="movie__voteaverage">{movie.vote_average.toFixed(1)}</p>
        <p className="moviE__genres">
          {movie.genres && movie.genres.map((g) => g.name).join(", ")}
        </p>
        <p className="movie__overview">{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
