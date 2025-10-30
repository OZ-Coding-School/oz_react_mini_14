import { useNavigate } from "react-router-dom";
import "./NavBar.scss";
import _ from "lodash"; //debounce 사용 관련 // 전체 라이브러리 불러오기
import { useCallback, useState } from "react";
import { setSearchText } from "../../store/searchSlice";
import { useDispatch } from "react-redux";

// const API_URL = import.meta.env.VITE_SEARCH_KEYWORD_URL;
// const API_KEY = import.meta.env.VITE_API_KEY;

export default function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  function handleClick() {
    navigate("/");
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

  return (
    <nav className="navbar">
      <div className="logo" onClick={handleClick}>
        웅무비
      </div>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="영화 제목을 입력하시오"
        />
      </div>
      <div className="btn">
        <button>로그인</button>
        <button>회원가입</button>
      </div>
    </nav>
  );
}
