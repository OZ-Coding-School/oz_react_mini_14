import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CommonButton } from "@common";
import { useAuthActions, useSearchHandler, useThemeToggle } from "@hooks";
import "./NavBar.scss";

export default function NavBar() {
  const navigate = useNavigate();

  const isLogIn = useSelector((state) => state.logIn.isLogIn);
  const { login, signup, logout } = useAuthActions();
  const { isDarkMode, toggleTheme } = useThemeToggle();
  const { inputValue, handleInputChange, resetSearch } = useSearchHandler();

  const handleLogoClick = () => {
    navigate("/");
    resetSearch();
  };

  return (
    <nav className={`navbar ${isDarkMode ? "dark" : "light"}`}>
      <h1 className="logo" onClick={handleLogoClick}>
        🎬 웅무비
      </h1>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="영화 제목을 입력하시오"
        />
      </div>
      <div className="loginBtn">
        <CommonButton
          type="button"
          aria-label="모드 변경"
          onClick={toggleTheme}
        >
          {isDarkMode ? "🌙" : "☀️"}
        </CommonButton>
        {isLogIn ? (
          <>
            <CommonButton>🧓</CommonButton>
            <CommonButton
              type="submit"
              aria-label="로그아웃 진행"
              onClick={logout}
            >
              로그아웃
            </CommonButton>
          </>
        ) : (
          <>
            <CommonButton
              type="submit"
              aria-label="로그인 데이터 전송"
              onClick={login}
            >
              로그인
            </CommonButton>
            <CommonButton
              type="submit"
              aria-label="회원가입 데이터 전송"
              onClick={signup}
            >
              회원가입
            </CommonButton>
          </>
        )}

        {/* <button
          className="hamburgerBtn"
          // onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          ☰
        </button> */}
      </div>
    </nav>
  );
}
