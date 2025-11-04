import { Link, useSearchParams } from "react-router-dom";
import "./NavBar.css";
import { useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { useEffect } from "react";

function NavBar() {
  const [input, setInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const debouncedInput = useDebounce(input, 500);

  useEffect(() => {
    const q = searchParams.get("query") || "";
    setInput(q);
  }, []);

  useEffect(() => {
    if (debouncedInput && debouncedInput.trim() !== "") {
      setSearchParams({ query: debouncedInput.trim() });
    } else {
      setSearchParams({});
    }
  }, [debouncedInput, setSearchParams]);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo-link">
          <h1 className="logo">🎬 OZ무비</h1>
        </Link>
      </div>

      <div className="navbar-center">
        <input
          type="text"
          placeholder="영화를 검색해보세요"
          className="search-bar"
          value={input}
          onChange={(e) => setInput(e.target.value)}
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
