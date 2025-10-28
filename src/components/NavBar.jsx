import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        🎬 Movie App
      </Link>

      <Link to="/" className="nav-link">
        홈
      </Link>
    </nav>
  );
}

export default NavBar;
