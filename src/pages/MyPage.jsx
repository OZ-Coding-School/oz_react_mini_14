// src/pages/MyPage.jsx
import { useEffect, useRef, useState } from "react";
import "./App.css";
import { useAuth } from "../contexts/AuthContext";
import MovieCard from "../components/MovieCard";
import { getPopularMoviesByPage } from "../api/tmdb";

function MyPage() {
  const { user } = useAuth();

  const nickname =
    user?.user_metadata?.name ||
    user?.user_metadata?.nickname ||
    user?.nickname ||
    "손님";

  const email = user?.email || "알 수 없음";

  // ====== 무한 스크롤 상태 ======
  const [movies, setMovies] = useState([]); // 영화 목록
  const [page, setPage] = useState(1); // 현재 페이지
  const [hasMore, setHasMore] = useState(true); // 더 있는지
  const [loading, setLoading] = useState(false); // 로딩 여부
  const loaderRef = useRef(null); // 바닥 감지 ref

  // 페이지가 바뀔 때마다 영화 로드
  useEffect(() => {
    const loadMovies = async () => {
      if (!hasMore) return;
      setLoading(true);

      const { results, total_pages } = await getPopularMoviesByPage(page);

      setMovies((prev) => [...prev, ...(results || [])]);
      if (!total_pages || page >= total_pages) {
        setHasMore(false);
      }

      setLoading(false);
    };

    loadMovies();
  }, [page, hasMore]);

  // IntersectionObserver로 스크롤 바닥 감지[web:170][web:179]
  useEffect(() => {
    if (!hasMore) return;
    const target = loaderRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 },
    );

    observer.observe(target);
    return () => observer.unobserve(target);
  }, [hasMore, loading]);

  return (
    <section className="app-container" aria-labelledby="mypage-title">
      <h1 id="mypage-title" className="app-title">
        마이페이지
      </h1>

      {/* 유저 정보 카드 */}
      <div className="movie-grid">
        <div
          style={{
            maxWidth: 400,
            margin: "0 auto",
            padding: "24px 20px",
            borderRadius: 16,
            backgroundColor: "#18181b",
            color: "#fff",
          }}
        >
          <p style={{ marginBottom: 12 }}>
            <strong>닉네임:</strong> {nickname}
          </p>
          <p>
            <strong>이메일:</strong> {email}
          </p>
        </div>
      </div>

      {/* 인기 영화 무한 스크롤 리스트 */}
      <div className="movie-grid" style={{ marginTop: 32 }}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* 바닥 감지용 div */}
      <div ref={loaderRef} style={{ height: 1 }} />

      {/* 상태 표시 */}
      {loading && (
        <p style={{ textAlign: "center", color: "#fff", padding: "16px 0" }}>
          불러오는 중...
        </p>
      )}
      {!hasMore && movies.length > 0 && (
        <p style={{ textAlign: "center", color: "#999", padding: "16px 0" }}>
          더 이상 불러올 영화가 없습니다.
        </p>
      )}
    </section>
  );
}

export default MyPage;
