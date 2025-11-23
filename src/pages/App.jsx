import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useCurrentUser, useInfiniteMovies } from '@/hooks';
import {
  getHasJustLoggedIn,
  getHasJustLoggedOut,
  setHasJustLoggedIn,
  setHasJustLoggedOut,
} from '@/utils/auth';
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
  const { data: user } = useCurrentUser();
  const movieList = data?.pages?.flatMap((page) => page.data);

  useEffect(() => {
    const hasJustLoggedIn = getHasJustLoggedIn();
    const hasJustLoggedOut = getHasJustLoggedOut();

    if (hasJustLoggedIn && user) {
      toast.success(`${user.name}님, 환영합니다!`);
      setHasJustLoggedIn(false);
    }
    if (hasJustLoggedOut && !user) {
      toast.success('로그아웃 되었습니다.');
      setHasJustLoggedOut(false);
    }
  }, [user]);

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
