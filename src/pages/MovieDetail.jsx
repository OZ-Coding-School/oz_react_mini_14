import "./MovieDetail.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams();
  const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;
  const baseUrl = "https://image.tmdb.org/t/p/w500";

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMovieDetail = async () => {
    setLoading(true);

    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
    );

    const data = await res.json();
    setMovie(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMovieDetail();
  }, [id]);

  if (loading || !movie) return <div className="loading">Loading...</div>;

  return (
    <div className="movie-detail">
      {/* 배경 이미지 */}
      <div
        className="movie-detail-backdrop"
        style={{
          backgroundImage: `url(${baseUrl}${movie.backdrop_path})`,
        }}
      ></div>

      <div className="movie-detail-content">
        {/* 포스터 */}
        <img
          className="movie-detail-poster"
          src={`${baseUrl}${movie.poster_path}`}
          alt={movie.title}
        />

        {/* 정보 */}
        <div className="movie-detail-info">
          <h1>{movie.title}</h1>
          <p>⭐ {movie.vote_average?.toFixed(1)}</p>

          <div className="movie-detail-genres">
            {movie.genres?.map((g) => (
              <span key={g.id} className="genre-tag">
                {g.name}
              </span>
            ))}
          </div>

          <h3>줄거리</h3>
          <p className="overview">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
