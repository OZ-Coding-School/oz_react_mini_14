import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './App.css';

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const fetchDetail = async () => {
      const apiKey = import.meta.env.VITE_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=ko-KR`;

      try {
        const res = await fetch(url, { headers: { accept: 'application/json' } });
        if (!res.ok) throw new Error('상세 정보 요청 실패');
        const data = await res.json();
        setMovie(data);
      } catch (e) {
        console.error('상세 정보 불러오기 실패:', e);
      }
    };

    if (id) fetchDetail();
  }, [id]);

  return (
    <div className="app-container">
      <div className="detail-container">
        <div className="detail-content">
          <div className="detail-image-area">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
              className="detail-image"
            />
          </div>
          <div className="detail-info-area">
            <h1>{movie.title}</h1>
            <p>평균 평점: {movie.vote_average?.toFixed(1)}</p>
            <h3>장르:</h3>
            <ul className="detail-genres">
              {movie.genres?.map(g => (
                <li key={g.id}>{g.name}</li>
              ))}
            </ul>
            <h3>줄거리:</h3>
            <p>{movie.overview || '줄거리 정보가 없습니다.'}</p>
          </div>
        </div>
        <button onClick={() => navigate('/')} className="back-button">
          목록으로 돌아가기
        </button>
      </div>
    </div>
  );
}