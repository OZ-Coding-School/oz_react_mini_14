import movieDetailData from "../data/movieDetailData.json";
// import "../styles/MovieDetail.css";

export default function MovieDetail() {
  const movie = movieDetailData;

  return (
    <div className="movieDetail">
      <img
        className="poster"
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        alt={movie.title}
      />
      <div>
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        <p>Release Date: {movie.release_date}</p>
        <p>Rating: {movie.vote_average}</p>
      </div>
    </div>
  );
}
