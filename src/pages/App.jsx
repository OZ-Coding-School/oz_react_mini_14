import { useState, useEffect } from "react";
import { getPopularMovies } from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // 컴포넌트 마운트 시 API 호출
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await getPopularMovies();
        setMovies(data);
      } catch (error) {
        console.error("영화 데이터 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // 로딩 중일 때
  if (loading) {
    return <div className="loading">영화 목록을 불러오는 중...</div>;
  }

  return (
    <div className="app-container">
      <h1 className="app-title">인기 영화</h1>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default App;
