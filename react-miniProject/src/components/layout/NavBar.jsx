import { useNavigate } from "react-router-dom";
import "./NavBar.scss";
import _ from "lodash"; //debounce 사용 관련 // 전체 라이브러리 불러오기
import { useCallback, useState } from "react";
import { logInState, setSearchText, themeToggleState } from "../../store/slice";
import { useDispatch, useSelector } from "react-redux";
import { useSupabaseAuth } from "../../../supabase";
import CommonButton from "../common/CommonButton";
import { toast } from "react-toastify";

export default function NavBar() {
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const supabaseAuth = useSupabaseAuth();

  const isDarkMode = useSelector((state) => state.themeToggle.isDarkMode);
  const isLogIn = useSelector((state) => state.logIn.isLogIn);

  const handleClick = useCallback(() => {
    navigate("/");
    setInputValue("");
    debouncedSearch(""); // debounce 함수 호출
  });

  const debouncedSearch = useCallback(
    _.debounce((query) => {
      dispatch(setSearchText(query));
    }, 400),
    []
  );

  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSearch(value); // debounce 함수 호출
  });

  const handleDLToggle = useCallback(() => {
    dispatch(themeToggleState());
  });

  const handlePage = useCallback(async (param) => {
    if (param === "login") {
      navigate("/login");
    } else if (param === "signup") {
      navigate("/signup");
    } else if (param === "logout") {
      try {
        await supabaseAuth.logout();
        dispatch(logInState(false));
        toast.success("로그아웃 되었습니다.");
        navigate("/");
      } catch (error) {
        toast.error("로그아웃 중 오류가 발생하였습니다.");
        console.log("로그아웃 실패 : ", error);
      }
    }
  });

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
        <CommonButton
          type="button"
          aria-label="모드 변경"
          onClick={handleDLToggle}
        >
          {isDarkMode ? "🌙" : "☀️"}
        </CommonButton>
        {isLogIn ? (
          <>
            <CommonButton>🧓</CommonButton>
            <CommonButton
              type="submit"
              aria-label="로그아웃 진행"
              onClick={() => handlePage("logout")}
            >
              로그아웃
            </CommonButton>
          </>
        ) : (
          <>
            <CommonButton
              type="submit"
              aria-label="로그인 데이터 전송"
              onClick={() => handlePage("login")}
            >
              로그인
            </CommonButton>
            <CommonButton
              type="submit"
              aria-label="회원가입 데이터 전송"
              onClick={() => handlePage("signup")}
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
