import MovieCard from "./MovieCard";

const MovieList = () => {
  const movies = new Array(25).fill(null);

  return (
    <div className="bg-gray-900 min-h-screen p-10">
      <div
        className="grid grid-cols-5 gap-6 justify-items-center"
      >
        {movies.map((movie, index) => (
          <MovieCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
