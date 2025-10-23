import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🎬 Movie App
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              홈
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/details" className="navbar-link">
              상세보기
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
