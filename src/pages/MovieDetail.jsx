import { useState } from "react";
import movieDetailData from "../data/movieDetailData.json";
import "./MovieDetail.css";

function MovieDetail() {
  const [movieDetail] = useState(movieDetailData);
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="detail-container">
      <div className="detail-backdrop">
        <img
          src={`${imageBaseUrl}${movieDetail.backdrop_path}`}
          alt={movieDetail.title}
          className="detail-backdrop-image"
        />
        <div className="detail-backdrop-overlay"></div>
      </div>

      <div className="detail-content">
        <div className="detail-poster">
          <img
            src={`${imageBaseUrl}${movieDetail.poster_path}`}
            alt={movieDetail.title}
          />
        </div>

        <div className="detail-info">
          <h1 className="detail-title">{movieDetail.title}</h1>

          <div className="detail-rating">
            <span>⭐ {movieDetail.vote_average.toFixed(1)}</span>
          </div>

          <div className="detail-genres">
            {movieDetail.genres.map((genre) => (
              <span key={genre.id} className="genre-tag">
                {genre.name}
              </span>
            ))}
          </div>

          <div className="detail-overview">
            <h3>줄거리</h3>
            <p>{movieDetail.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
