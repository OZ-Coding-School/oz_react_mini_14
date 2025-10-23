import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="bg-blue-300 text-white py-4 shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">MovieApp</Link>
        </h1>
        <div className="space-x-4">
          <Link to="/" className="hover:text-yellow-400">
            홈
          </Link>
          <Link to="/details" className="hover:text-yellow-400">
            정보
          </Link>
        </div>
      </div>
    </nav>
  );
}
