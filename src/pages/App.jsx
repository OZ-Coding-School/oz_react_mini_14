import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { useAuth, useAuthActions } from '@/hooks';
import { getMovieList } from '@/apis';
import { getHasJustLoggedIn, setHasJustLoggedIn } from '@/utils/auth';
import { Indicator, Error, MovieList, Carousel, Button } from '@/components';
import { TOAST_DURATION } from '@/constants';

function App() {
  const [isCarousel, setIsCarousel] = useState(false);
  const {
    data: movieList,
    loading,
    error,
  } = useQuery({ queryKey: ['movie'], queryFn: getMovieList });
  const { user, loading: authLoading, error: authError } = useAuth();
  const { clearError } = useAuthActions();
  const filteredMovieList = movieList?.filter((item) => !item.adult);

  useEffect(() => {
    const hasJustLoggedIn = getHasJustLoggedIn();
    if (hasJustLoggedIn && user) {
      toast.success(`${user.name}님, 환영합니다!`);
      setHasJustLoggedIn(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading]);

  useEffect(() => {
    const hasJustLoggedIn = getHasJustLoggedIn();
    if (hasJustLoggedIn && authError) {
      toast.error(authError.message, { autoClose: TOAST_DURATION.error });
      clearError();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authError]);

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
