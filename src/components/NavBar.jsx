import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link to="/" className="brand">🎬 Mini Movies</Link>
        <nav className="nav-right">
          <a
            href="https://image.tmdb.org/t/p/w500"
            target="_blank"
            rel="noreferrer"
            className="baseurl"
            title="TMDB image base URL"
          >
            img base: /t/p/w500
          </a>
        </nav>
      </div>
    </header>
  );
}
