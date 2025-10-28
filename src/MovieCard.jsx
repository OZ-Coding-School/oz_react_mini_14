const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";

export default function MovieCard({ posterPath, title, voteAverage, onClick }) {
  return (
    <div className="movie-card" onClick={onClick}>
      <img src={`${IMAGE_BASE_URL}${posterPath}`} alt={title} className="movie-card-img" /> 
      <h3>{title}</h3>
      <p>별점: {voteAverage}</p>
    </div>
  );
};