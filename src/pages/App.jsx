import { useState } from 'react';
import MovieList from '@/components/MovieList';
import Carousel from '@/components/Carousel';
import data from '@/mocks/movieListData.json';

function App() {
  const [isCarousel, setIsCarousel] = useState(false);
  const movieList = data.results;

  return (
    <>
      <button
        className="button mt-10 ml-22 w-44 px-4 py-2 text-stone-50"
        onClick={() => setIsCarousel((prev) => !prev)}
      >
        {isCarousel ? 'View List' : 'View Carousel'}
      </button>
      {isCarousel ? (
        <Carousel movieList={movieList} />
      ) : (
        <MovieList movieList={movieList} />
      )}
    </>
  );
}

export default App;
