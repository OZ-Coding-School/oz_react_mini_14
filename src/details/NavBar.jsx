import "../styles/NavBar.css";

export default function NavBar() {
  return (
    <nav className="navbar">
      <h1 className="logo">🎬 OZ무비</h1>
      <div className="searchBox">
        <input />
      </div>
      <div className="btn">
        <button className="loginBtn">로그인</button>
        <button className="signupBtn">회원가입</button>
      </div>
    </nav>
  );
}
