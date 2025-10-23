import "./styles/App.css";
import MovieCard from "./MovieCard";
import movieListData from "./data/movieListData.json";

export default function App() {
  const movies = movieListData.results;

  return (
    <div className="MovieList">
      {movies.map((movie) => (
        <MovieCard key={movie.id} data={movie} />
      ))}
    </div>
  );
}
