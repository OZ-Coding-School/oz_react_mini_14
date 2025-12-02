// src/pages/MyPage.jsx
import "./App.css";
import { useAuth } from "../contexts/AuthContext";

function MyPage() {
  const { user } = useAuth();

  const nickname =
    user?.user_metadata?.name || // ✅ 먼저 name 사용
    user?.user_metadata?.nickname || // 나중에 nickname 도 지원
    user?.nickname ||
    "손님";

  const email = user?.email || "알 수 없음";

  return (
    <section className="app-container" aria-labelledby="mypage-title">
      <h1 id="mypage-title" className="app-title">
        마이페이지
      </h1>

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
    </section>
  );
}

export default MyPage;
