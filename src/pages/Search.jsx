import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFetch } from '@/hooks';
import { getMovieListByKeyword } from '@/apis';
import { Indicator, Error, MovieList } from '@/components';

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
  if (movieList.length === 0)
    return (
      <p className="flex-center mt-40 text-xl font-bold dark:text-stone-50">
        ⚠️ 검색 결과가 없습니다.
      </p>
    );
  return <MovieList movieList={filteredMovieList} />;
}

export default Search;
