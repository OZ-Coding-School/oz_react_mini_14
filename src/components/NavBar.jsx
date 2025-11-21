import { useState, useEffect, useContext } from "react";
import useDebounce from "@hooks/useDebounce";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "@sbCtx/UserContext";
import { useSupabaseAuth } from "@sb";
import { Button } from "@components";

export default function NavBar() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);
  const { logout } = useSupabaseAuth();

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (debouncedSearch.trim()) {
      navigate(`/search?query=${encodeURIComponent(debouncedSearch)}`);
    }
  }, [debouncedSearch, navigate]);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    localStorage.removeItem("userInfo");
    setShowMenu(false);
    navigate("/");
  };

  const isLoggedIn = !!user;

  return (
    <nav className="bg-blue-300 text-white py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">MovieApp</Link>
        </h1>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="영화 검색"
          className="px-4 py-2 w-64 rounded-xl text-gray-700 focus:outline-none bg-white"
        />

        <div className="relative flex items-center space-x-4">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="hover:text-yellow-400">
                로그인
              </Link>
              <Link to="/signup" className="hover:text-yellow-400">
                회원가입
              </Link>
            </>
          ) : (
            <>
              <div
                className="relative cursor-pointer"
                onClick={() => setShowMenu((prev) => !prev)}
              >
                <img
                  src={
                    user?.profileImageUrl || "https://via.placeholder.com/40"
                  }
                  alt="profile"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />

                {showMenu && (
                  <div className="absolute right-0 mt-2 w-32 bg-white text-gray-800 rounded-lg shadow-lg">
                    <Link
                      to="/mypage"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      마이페이지
                    </Link>
                    <Button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      로그아웃
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
