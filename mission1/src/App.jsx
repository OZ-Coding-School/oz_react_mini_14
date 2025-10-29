import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import data from "./assets/data/movieListData.json";
import Header from "./components/Header";
import MovieCard from "./components/movieCard";

function App() {
  const [movies, setMovies] = useState(data.movies);
  const [selectedMovie, setSelectedMovie] = useState([]);

  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <MovieCard
                movies={movies}
                setMovies={setMovies}
                selectedMovie={selectedMovie}
                setSelectedMovie={setSelectedMovie}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
