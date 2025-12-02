import { useSearchParams } from 'react-router-dom';
import { getMovieListByKeyword } from '@/apis';
import { Indicator, Error, MovieList } from '@/components';
import { useQuery } from '@tanstack/react-query';

function Search() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') ?? '';
  const {
    data: movieList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['movie', keyword],
    queryFn: () => getMovieListByKeyword({ params: { keyword } }),
    gcTime: 0,
  });
  const filteredMovieList = movieList?.data?.filter((item) => !item.adult); // 수정

  if (isLoading) return <Indicator />;
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
