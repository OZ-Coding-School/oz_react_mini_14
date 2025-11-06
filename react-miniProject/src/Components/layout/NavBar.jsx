import { useNavigate } from "react-router-dom";
import "./NavBar.scss";
import _ from "lodash"; //debounce 사용 관련 // 전체 라이브러리 불러오기
import { useCallback, useState } from "react";
import { logInState, setSearchText, themeToggleState } from "../../store/slice";
import { useDispatch, useSelector } from "react-redux";

export default function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const isDarkMode = useSelector((state) => state.themeToggle.isDarkMode);
  const isLogIn = useSelector((state) => state.logIn.isLogIn);

  function handleClick() {
    navigate("/");
    setInputValue("");
    debouncedSearch(""); // debounce 함수 호출
  }

  const debouncedSearch = useCallback(
    _.debounce((query) => {
      dispatch(setSearchText(query));
    }, 400),
    []
  );

  function handleInputChange(e) {
    const value = e.target.value;
    setInputValue(value);
    debouncedSearch(value); // debounce 함수 호출
  }

  function handleDLToggle() {
    dispatch(themeToggleState());
  }

  function handlePage(param) {
    if (param === "login") {
      navigate("/login");
    } else if (param === "signup") {
      navigate("/signup");
    } else if (param === "logout") {
      alert("로그아웃 되었습니다.");
      dispatch(logInState(false));
      navigate("/");
    }
  }

  return (
    <nav className={`navbar ${isDarkMode ? "dark" : "light"}`}>
      <div className="logo" onClick={handleClick}>
        🎬 웅무비
      </div>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="영화 제목을 입력하시오"
        />
      </div>
      <div className="loginBtn">
        <button onClick={handleDLToggle}>{isDarkMode ? "🌙" : "☀️"}</button>
        {isLogIn ? (
          <>
            <button>🧓</button>
            <button onClick={() => handlePage("logout")}>로그아웃</button>
          </>
        ) : (
          <>
            <button onClick={() => handlePage("login")}>로그인</button>
            <button onClick={() => handlePage("signup")}>회원가입</button>
          </>
        )}

        <button
          className="hamburgerBtn"
          // onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>
    </nav>
  );
}
