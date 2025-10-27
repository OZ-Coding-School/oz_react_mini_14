import React from 'react';
import { useNavigate } from 'react-router-dom';

const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const { id, title, poster_path, vote_average } = movie;

  return (
    <div
      className="card"
      role="button"
      onClick={() => navigate(`/details/${id}`)}  // ✅ id 포함
      title={`${title} 상세보기`}
    >
      <div className="poster-wrap">
        {poster_path ? (
          <img src={`${IMG_BASE}${poster_path}`} alt={title} className="poster" />
        ) : (
          <div className="poster placeholder">No Image</div>
        )}
      </div>

      <div className="card-body">
        <div className="title" title={title}>{title}</div>
        <div className="rating">
          <span className="star">★</span>
          <span>{Number(vote_average).toFixed(3)}</span>
        </div>
      </div>
    </div>
  );
}
