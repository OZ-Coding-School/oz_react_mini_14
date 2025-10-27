import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="bg-blue-300 text-white py-4 shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">MovieApp</Link>
        </h1>
        <input
          type="text"
          name="search"
          placeholder="영화 검색"
          className="px-4 py-2 text-gray-700 focus:outline-none w-80 bg-white rounded-xl"
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
