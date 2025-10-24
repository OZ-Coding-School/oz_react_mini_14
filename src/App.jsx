import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MovieCard from './MovieCard';
import MovieDetail from './MovieDetail';
import movieListData from './movieListData.json';
import movieDetailData from './movieDetailData.json';
import './App.css';

export default function App() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setMovies(movieListData.results);
  }, []);

  const handleMovieClick = (movie) => {
    if (movie.id === movieDetailData.id) {
      navigate('/details');
    }
  };

  const MovieList = () => (
    <div className="movie-list-wrapper">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          posterPath={movie.poster_path}
          title={movie.title}
          voteAverage={movie.vote_average}
          onClick={() => handleMovieClick(movie)}
        />
      ))}
    </div>
  );

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-brand">OZ무비</div>
        <div className="navbar-search">
          <input type="text" placeholder="검색" />
        </div>
        <div className="navbar-buttons">
          <button className="login-btn">로그인</button>
          <button className="signup-btn">회원가입</button>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/details" element={<MovieDetail />} />
      </Routes>
    </div>
  );
};