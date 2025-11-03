import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MovieCard from "./components/MovieCard";
import { useMovieList } from "./context/MovieListData";
import { useMovieDetail } from "./context/MovieDetailData";
import DetailPage from "./components/DetailPage";

function App() {
  const { movies } = useMovieList();
  const { selectedMovie } = useMovieDetail();

  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<MovieCard movies={movies} />} />
          <Route path="/movies/:id" element={<DetailPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
