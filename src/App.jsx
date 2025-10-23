import "./styles/App.css";
import MovieCard from "./components/MovieCard";
import movieListData from "./data/movieListData.json";

export default function App() {
  return (
    <>
      {movieListData.results.map((data) => (
        <MovieCard key={data.id} data={data} />
      ))}
    </>
  );
}
