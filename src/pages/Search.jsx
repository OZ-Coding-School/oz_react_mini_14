import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import useFetch from '@/hooks/useFetch';
import getMovieListByKeyword from '@/apis/getMovieListByKeyword';
import Indicator from '@/components/Indicator';
import Error from '@/components/Error';
import MovieList from '@/components/MovieList';

function Search() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') ?? '';
  const fetchOptions = useMemo(() => ({ params: { keyword } }), [keyword]);
  const {
    data: movieList,
    loading,
    error,
  } = useFetch({
    api: getMovieListByKeyword,
    options: fetchOptions,
  });
  const filteredMovieList = movieList.filter((item) => !item.adult);

  if (loading || !movieList) return <Indicator />;
  if (error) return <Error message={error.message} />;
  return <MovieList movieList={filteredMovieList} />;
}

export default Search;
