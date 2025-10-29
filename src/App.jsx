import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MovieCard from './MovieCard';
import MovieDetail from './MovieDetail';
import './App.css';

export default function App() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      const apiKey = import.meta.env.VITE_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR&page=1`;

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            accept: 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`API 요청 실패: ${response.status}`);
        }
        
        const data = await response.json();
        
        const filteredMovies = data.results.filter(movie => !movie.adult);
        setMovies(filteredMovies);
        
      } catch (error) {
        console.error('영화 목록 불러오기 실패:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleMovieClick = (movie) => {
    navigate(`/details/${movie.id}`);
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
        <Route path="/details/:id" element={<MovieDetail />} />
      </Routes>
    </div>
  );
}