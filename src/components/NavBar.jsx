// src/components/NavBar.jsx
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { searchMovies } from "../api";
import { useDebounce } from "../hooks";
import { useAuth } from "../contexts/AuthContext";
import "./NavBar.css";

function NavBar() {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const searchRef = useRef(null);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedSearchQuery.trim() === "") {
        setSearchResults([]);
        setShowResults(false);
        return;
      }
      setIsSearching(true);
      try {
        const results = await searchMovies(debouncedSearchQuery);
        setSearchResults(results.slice(0, 5));
        setShowResults(true);
      } catch (error) {
        console.error("검색 실패:", error);
      } finally {
        setIsSearching(false);
      }
    };
    fetchResults();
  }, [debouncedSearchQuery]);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleResultClick = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };

  return (
    <nav className="navbar" aria-label="메인 네비게이션">
      <h1 className="navbar-logo">
        <Link to="/" tabIndex={0} aria-label="홈으로 이동">
          Movie App
        </Link>
      </h1>

      <div className="navbar-right">
        <div className="navbar-account">
          {!user ? (
            <>
              <Link to="/login" className="navbar-link">
                로그인
              </Link>
              <Link to="/signup" className="navbar-link">
                회원가입
              </Link>
            </>
          ) : (
            <>
              <Link to="/mypage" className="navbar-link">
                마이페이지
              </Link>
              <span className="navbar-user-email">{user.email}</span>
              <button onClick={logout} className="navbar-link">
                로그아웃
              </button>
            </>
          )}
        </div>

        <form
          className="search-container"
          ref={searchRef}
          role="search"
          autoComplete="off"
          onSubmit={(e) => e.preventDefault()}
          aria-label="영화 검색"
        >
          <input
            id="searchInput"
            type="text"
            className="search-input"
            placeholder="영화 검색..."
            value={searchQuery}
            onChange={handleSearchChange}
            aria-autocomplete="list"
            aria-controls="search-results-list"
          />
          {showResults && (
            <ul
              className="search-results"
              id="search-results-list"
              role="listbox"
            >
              {isSearching && <li className="search-loading">검색 중...</li>}
              {!isSearching && searchResults.length === 0 && (
                <li className="search-empty">검색 결과가 없습니다</li>
              )}
              {!isSearching &&
                searchResults.map((movie) => (
                  <li
                    key={movie.id}
                    className="search-result-item"
                    role="option"
                    tabIndex={0}
                  >
                    <Link
                      to={`/movie/${movie.id}`}
                      onClick={handleResultClick}
                      tabIndex={-1}
                    >
                      {movie.poster_path && (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                          alt={movie.title}
                          className="search-result-poster"
                        />
                      )}
                      <div className="search-result-info">
                        <span className="search-result-title">
                          {movie.title}
                        </span>
                        <span className="search-result-year">
                          {movie.release_date?.split("-")[0]}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>
          )}
        </form>
      </div>
    </nav>
  );
}

export default NavBar;
