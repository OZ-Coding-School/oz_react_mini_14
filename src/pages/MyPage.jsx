// src/pages/MyPage.jsx
import "./App.css";

function MyPage() {
  // TODO: 나중에 AuthContext에서 실제 로그인 유저 정보 사용
  const user = {
    nickname: "코딩왕",
    email: "test@test.com",
  };

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
            <strong>닉네임:</strong> {user.nickname}
          </p>
          <p>
            <strong>이메일:</strong> {user.email}
          </p>
        </div>
      </div>
    </section>
  );
}

export default MyPage;
