import { useEffect, useRef, useState } from 'react';
import { useAuthToast, useInfiniteMovies } from '@/hooks';
import { Indicator, Error, MovieList, Carousel, Button } from '@/components';

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

  useEffect(() => {
    if (!bottomRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      const isInView = entries[0].isIntersecting;
      if (isInView && hasNextPage) fetchNextPage();
    });

    observer.observe(bottomRef.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasNextPage]);

  if (isMovieLoading) return <Indicator />;
  if (movieError) return <Error message={movieError.message} />;
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
