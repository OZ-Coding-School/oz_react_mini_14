import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth, useAuthActions, useFetch } from '@/hooks';
import { getMovieList } from '@/apis';
import { Indicator, Error, MovieList, Carousel, Button } from '@/components';
import { ERROR_TOAST_DURATION, SESSION_STORAGE_KEYS } from '@/constants';

function App() {
  const [isCarousel, setIsCarousel] = useState(false);
  const { data: movieList, loading, error } = useFetch({ api: getMovieList });
  const { user, loading: authLoading, error: authError } = useAuth();
  const { clearError } = useAuthActions();
  const filteredMovieList = movieList.filter((item) => !item.adult);

  useEffect(() => {
    const hasJustLoggedIn = JSON.parse(
      sessionStorage.getItem(SESSION_STORAGE_KEYS.HAS_JUST_LOGGED_IN),
    );
    if (hasJustLoggedIn && user) {
      toast.success('로그인 되었습니다.');
      sessionStorage.setItem(
        SESSION_STORAGE_KEYS.HAS_JUST_LOGGED_IN,
        JSON.stringify(false),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading]);

  useEffect(() => {
    const hasJustLoggedIn = JSON.parse(
      sessionStorage.getItem(SESSION_STORAGE_KEYS.HAS_JUST_LOGGED_IN),
    );
    if (hasJustLoggedIn && authError) {
      toast.error(authError.message, { autoClose: ERROR_TOAST_DURATION });
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
