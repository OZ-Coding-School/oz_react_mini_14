import { useState, useEffect } from "react";
import { getPopularMovies } from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div className="loading">영화 목록을 불러오는 중...</div>;
  }

  return (
    // section(섹션)으로 전체 영화 리스트 구획
    <section className="app-container" aria-labelledby="popular-movies-title">
      {/* h1(헤딩원)로 메인 타이틀, id 연결 */}
      <h1 id="popular-movies-title" className="app-title">
        인기 영화
      </h1>
      <div className="movie-grid">
        {movies.map((movie) => (
          // 각 영화는 article로 semantic block
          <article key={movie.id} className="movie-article">
            <MovieCard movie={movie} />
          </article>
        ))}
      </div>
    </section>
  );
}

export default App;
