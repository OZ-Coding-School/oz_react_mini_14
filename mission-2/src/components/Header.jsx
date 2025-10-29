import React from "react";
import { Link } from "react-router-dom";
// import "./Header.css"; // import the external CSS file

function Header() {
  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">
        <span className="oz">OZ</span>
        <span className="movie">무비.</span>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="검색어를 입력하세요..."
          className="search-input"
        />
      </div>

      {/* Buttons */}
      <div className="auth-buttons">
        <Link to="/login" className="btn">
          로그인
        </Link>
        <Link to="/signup" className="btn">
          회원가입
        </Link>
      </div>
    </header>
  );
}

export default Header;
