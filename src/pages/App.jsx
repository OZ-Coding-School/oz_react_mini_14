import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks';
import { getMovieList, getUserInfo } from '@/apis';
import {
  getHasJustLoggedIn,
  getHasJustLoggedOut,
  setHasJustLoggedIn,
  setHasJustLoggedOut,
} from '@/utils/auth';
import { Indicator, Error, MovieList, Carousel, Button } from '@/components';

function App() {
  const [isCarousel, setIsCarousel] = useState(false);
  const { userId } = useAuth();
  const {
    data: movieList,
    loading: movieLoading,
    error: movieError,
  } = useQuery({ queryKey: ['movie'], queryFn: getMovieList });
  const { data: user } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserInfo({ params: { id: userId } }),
    enabled: !!userId,
  });
  const filteredMovieList = movieList?.filter((item) => !item.adult);

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

  if (movieLoading || !movieList) return <Indicator />;
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
        <Carousel movieList={filteredMovieList} />
      ) : (
        <MovieList movieList={filteredMovieList} />
      )}
    </>
  );
}

export default App;
