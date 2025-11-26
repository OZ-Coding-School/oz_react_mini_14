import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useDebounce from "../hooks/useDebounce";
import "./Navbar.css";

const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;

function Navbar() {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  const debounced = useDebounce(searchText, 500);
  const navigate = useNavigate();
  const boxRef = useRef(null);

  useEffect(() => {
    if (debounced.trim().length === 0) {
      setResults([]);
      return;
    }

    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${debounced}&language=ko-KR`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setResults(data.results?.slice(0, 5) || []);
      });

    navigate(`/?query=${debounced}`);
  }, [debounced, navigate]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setResults([]);
      }
    }
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <Link className="logo" to="/">
        Movie App
      </Link>

      <div className="center-box" ref={boxRef}>
        <input
          type="text"
          value={searchText}
          placeholder="영화 검색..."
          onChange={(e) => setSearchText(e.target.value)}
        />

        {results.length > 0 && (
          <ul className="suggest-box">
            {results.map((m) => (
              <li
                key={m.id}
                onClick={() => {
                  navigate(`/detail/${m.id}`);
                  setResults([]);
                  setSearchText(m.title);
                }}
              >
                {m.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="right-box"></div>
    </nav>
  );
}

export default Navbar;
