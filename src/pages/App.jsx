import { useState } from 'react';
import { useFetch } from '@/hooks';
import { getMovieList } from '@/apis';
import { Indicator, Error, MovieList, Carousel, Button } from '@/components';

function App() {
  const [isCarousel, setIsCarousel] = useState(false);
  const { data: movieList, loading, error } = useFetch({ api: getMovieList });
  const filteredMovieList = movieList.filter((item) => !item.adult);

  if (loading || !movieList) return <Indicator />;
  if (error) return <Error message={error.message} />;
  return (
    <>
      <Button
        type="button"
        variant="stone"
        size="xl"
        className="mt-10 ml-22"
        onClick={() => setIsCarousel((prev) => !prev)}
      >
        {isCarousel ? 'View List' : 'View Carousel'}
      </Button>
      {isCarousel ? (
        <Carousel movieList={filteredMovieList} />
      ) : (
        <MovieList movieList={filteredMovieList} />
      )}
    </>
  );
}

export default App;
