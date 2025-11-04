import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { searchMovies } from "../api/tmdb";
import { useDebounce } from "../hooks/useDebounce";
import "../styles/Navbar.css";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  // 검색어를 500ms 지연시켜 API 호출 최적화
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // 검색 결과 영역 외부 클릭 감지
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

  // debounce된 검색어가 변경될 때 API 호출
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (debouncedSearchQuery.trim() === "") {
        setSearchResults([]);
        setShowResults(false);
        return;
      }

      setIsSearching(true);
      try {
        const results = await searchMovies(debouncedSearchQuery);
        setSearchResults(results.slice(0, 5)); // 최대 5개만 표시
        setShowResults(true);
      } catch (error) {
        console.error("검색 실패:", error);
      } finally {
        setIsSearching(false);
      }
    };

    fetchSearchResults();
  }, [debouncedSearchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleResultClick = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        🎬 Movie App
      </Link>

      <div className="search-container" ref={searchRef}>
        <input
          type="text"
          className="search-input"
          placeholder="영화 검색..."
          value={searchQuery}
          onChange={handleSearchChange}
        />

        {showResults && (
          <div className="search-results">
            {isSearching && <div className="search-loading">검색 중...</div>}

            {!isSearching && searchResults.length === 0 && (
              <div className="search-empty">검색 결과가 없습니다</div>
            )}

            {!isSearching &&
              searchResults.map((movie) => (
                <Link
                  key={movie.id}
                  to={`/movie/${movie.id}`}
                  className="search-result-item"
                  onClick={handleResultClick}
                >
                  {movie.poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                      alt={movie.title}
                      className="search-result-poster"
                    />
                  )}
                  <div className="search-result-info">
                    <div className="search-result-title">{movie.title}</div>
                    <div className="search-result-year">
                      {movie.release_date?.split("-")[0]}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
