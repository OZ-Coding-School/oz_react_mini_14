// src/pages/MyPage.jsx
import "./App.css";
import "./MyPage.css"; // 새로 추가
import { useAuth } from "../contexts/AuthContext";
import { useFavorite } from "../contexts/FavoriteContext";
import MovieCard from "../components/MovieCard";

function MyPage() {
  const { user } = useAuth();
  const { favoriteMovies, favoriteIds, toggleFavorite, initialized } =
    useFavorite();

  const nickname =
    user?.user_metadata?.name ||
    user?.user_metadata?.nickname ||
    user?.nickname ||
    "손님";

  const email = user?.email || "알 수 없음";

  return (
    <section className="app-container" aria-labelledby="mypage-title">
      <h1 id="mypage-title" className="app-title">
        마이페이지
      </h1>

      {/* 상단 프로필 박스 */}
      <div className="mypage-profile-wrap">
        <div className="mypage-profile-box">
          <p className="mypage-profile-row">
            <span className="mypage-label">닉네임</span>
            <span className="mypage-value">{nickname}</span>
          </p>
          <p className="mypage-profile-row">
            <span className="mypage-label">이메일</span>
            <span className="mypage-value">{email}</span>
          </p>
        </div>
      </div>

      {/* 찜한 영화 섹션 */}
      <section className="mypage-favorite-section">
        <h2 className="app-subtitle">내가 찜한 영화</h2>

        {!initialized ? (
          <p className="mypage-helper">찜한 영화 불러오는 중...</p>
        ) : favoriteMovies.length === 0 ? (
          <p className="mypage-helper">아직 찜한 영화가 없습니다.</p>
        ) : (
          <div className="movie-grid">
            {favoriteMovies.map((movie) => (
              <article key={movie.id} className="movie-article">
                <MovieCard
                  movie={movie}
                  isFavorite={favoriteIds.includes(movie.id)}
                  onToggleFavorite={() => toggleFavorite(movie)}
                />
              </article>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}

export default MyPage;
