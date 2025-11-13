import Moviecard from "./MovieCard";

const MovieList = () => {
  const movies = new Array(20) .fill(null)

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-8 bg-gray-900 min-h-screen">
      {movies.map((movie, index) => (
        <Moviecard key={index} />
      ))}
    </div>
  );
};

export default MovieList;
