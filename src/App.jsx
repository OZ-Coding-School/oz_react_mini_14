import "./App.css";
import MovieCard from "./Components/MovieCard";
import movieListData from "./Data/movieListData.json";

function App() {
  // console.log(movieListDatas.results);
  return (
    <>
      {movieListData.results.map((data) => (
        <MovieCard key={data.id} data={data} />
      ))}
    </>
  );
}

export default App;
