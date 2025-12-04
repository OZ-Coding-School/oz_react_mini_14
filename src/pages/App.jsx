// src/pages/App.jsx
import { useEffect, useState, useRef } from "react";
import MovieCard from "../components/MovieCard";
import { useFavorite } from "../contexts/FavoriteContext";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { favoriteIds, toggleFavorite } = useFavorite();
  const observerTargetRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      if (loading) return;

      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
              accept: "application/json",
            },
          },
        );
        const data = await response.json();
        const newResults = data.results || [];

        setMovies((prev) =>
          page === 1 ? newResults : [...prev, ...newResults],
        );

        if (data.total_pages && page >= data.total_pages) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("영화 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, loading]); // ✅ loading 추가

  useEffect(() => {
    if (!hasMore || loading) return;

    const target = observerTargetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      {
        root: null,
        rootMargin: "0px 0px 150px 0px",
        threshold: 0.1,
      },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, loading]);

  return (
    <section className="app-container">
      <div className="movie-grid">
        {movies.map((movie) => (
          <article key={movie.id} className="movie-article">
            <MovieCard
              movie={movie}
              isFavorite={favoriteIds.includes(movie.id)}
              onToggleFavorite={() => toggleFavorite(movie)}
            />
          </article>
        ))}
      </div>

      {loading && (
        <p
          style={{
            textAlign: "center",
            color: "#9ca3af",
            padding: "16px 0",
            fontSize: "0.9rem",
          }}
        >
          영화 불러오는 중...
        </p>
      )}

      {!hasMore && !loading && (
        <p
          style={{
            textAlign: "center",
            color: "#6b7280",
            padding: "16px 0 24px",
            fontSize: "0.85rem",
          }}
        >
          모든 인기 영화를 다 불러왔습니다.
        </p>
      )}

      <div ref={observerTargetRef} style={{ height: 1 }} />
    </section>
  );
}

export default App;
