
import Item from "./MovieCard";
import MovieListData from "./movieListData.json";

const MovieList = () => {
  const movies = new Array(20) .fill(null)

  return (
    <div>
      {movies.map((movie, index) => (
        <Moviecard key={index} />
      ))}
    </div>
  );
};

export default MovieList;
