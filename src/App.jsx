import data from '@/mocks/movieListData.json';
import MovieCard from './components/MovieCard';

function App() {
  const movieList = data.results;

  return (
    <section className="flex flex-wrap justify-center gap-3 py-8">
      {movieList.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </section>
  );
}

export default App;
