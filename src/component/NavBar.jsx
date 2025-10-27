import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="logo">OZ무비</h1>
      </div>

      <div className="navbar-center">
        <input
          type="text"
          placeholder="영화를 검색해보세요"
          className="search-bar"
        />
      </div>

      <div className="navbar-right">
        <button className="btn login">로그인</button>
        <button className="btn signup">회원가입</button>
      </div>
    </nav>
  );
}

export default NavBar;
