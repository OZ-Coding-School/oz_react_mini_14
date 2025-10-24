import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import movieDetailData from './movieDetailData.json';
import './App.css';

export default function MovieDetail() {
  const [movie, setMovie] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setMovie(movieDetailData);
  }, []);

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
            <p>평균 평점: {movie.vote_average}</p>
            <h3>장르:</h3>
            <ul className="detail-genres">
              {movie.genres && movie.genres.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
            <h3>줄거리:</h3>
            <p>{movie.overview}</p>
          </div>
        </div>
        <button onClick={() => navigate('/')} className="back-button">
          목록으로 돌아가기
        </button>
      </div>
    </div>
  );
};