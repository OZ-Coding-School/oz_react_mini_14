import { useState } from 'react';
import { useFetch } from '@/hooks';
import { getMovieList } from '@/apis';
import { Indicator, Error, MovieList, Carousel } from '@/components';

function App() {
  const [isCarousel, setIsCarousel] = useState(false);
  const { data: movieList, loading, error } = useFetch({ api: getMovieList });
  const filteredMovieList = movieList.filter((item) => !item.adult);

  if (loading || !movieList) return <Indicator />;
  if (error) return <Error message={error.message} />;
  return (
    <>
      <button
        className="button mt-10 ml-22 w-44 px-4 py-2 text-stone-50"
        onClick={() => setIsCarousel((prev) => !prev)}
      >
        {isCarousel ? 'View List' : 'View Carousel'}
      </button>
      {isCarousel ? (
        <Carousel movieList={filteredMovieList} />
      ) : (
        <MovieList movieList={filteredMovieList} />
      )}
    </>
  );
}

export default App;
