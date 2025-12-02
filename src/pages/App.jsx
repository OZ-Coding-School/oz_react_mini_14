import { useRef, useState } from 'react';
import { useAuthToast, useInfiniteMovies, useInfiniteScroll } from '@/hooks';
import {
  Indicator,
  Error,
  MovieList,
  Carousel,
  MovieViewToggleButton,
} from '@/components';

function App() {
  const bottomRef = useRef(null);
  const [isCarousel, setIsCarousel] = useState(false);
  const {
    data,
    isLoading: isMovieLoading,
    error: movieError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteMovies();
  const movieList = data?.pages?.flatMap((page) => page.data);
  useAuthToast();
  useInfiniteScroll({ targetRef: bottomRef, hasNextPage, fetchNextPage });

  const handleToggle = () => setIsCarousel((prev) => !prev);

  if (isMovieLoading) return <Indicator />;
  if (movieError) return <Error message={movieError.message} />;
  return (
    <>
      <MovieViewToggleButton isCarousel={isCarousel} onToggle={handleToggle} />
      {isCarousel ? (
        <Carousel movieList={movieList} />
      ) : (
        <>
          <MovieList movieList={movieList} />
          <div className="h-5" ref={bottomRef}></div>
          {isFetchingNextPage && <Indicator />}
        </>
      )}
    </>
  );
}

export default App;
