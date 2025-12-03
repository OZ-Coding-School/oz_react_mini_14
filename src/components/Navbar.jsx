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
  }, [debounced]);

  const handleSelectMovie = (movieId) => {
    setSearchText("");
    setResults([]);
    navigate(`/detail/${movieId}`);
  };

  // 바깥 클릭 시 자동완성 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setResults([]);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Movie App
      </Link>

      <div className="search-container" ref={boxRef}>
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
          placeholder="검색..."
        />

        {results.length > 0 && (
          <ul className="autocomplete-box">
            {results.map((m) => (
              <li
                key={m.id}
                className="autocomplete-item"
                onClick={() => handleSelectMovie(m.id)}
              >
                {m.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
