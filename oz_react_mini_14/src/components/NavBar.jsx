import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useSearchParams } from "react-router-dom";

export default function NavBar() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [setSearchParams] = useSearchParams();

  useEffect(() => {
    if (debouncedSearch) {
      setSearchParams({ query: debouncedSearch });
    } else {
      setSearchParams({});
    }
  }, [debouncedSearch, setSearchParams]);

  return (
    <nav className="bg-blue-300 text-white py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">MovieApp</h1>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="영화 검색"
          className="px-4 py-2 w-64 rounded-xl text-gray-700 focus:outline-none bg-white"
        />

        <div className="flex items-center space-x-4">
          <Link to="/login" className="hover:text-yellow-400">
            로그인
          </Link>
          <Link to="/signup" className="hover:text-yellow-400">
            회원가입
          </Link>
        </div>
      </div>
    </nav>
  );
}
