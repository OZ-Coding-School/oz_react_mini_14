import { useIntersectionObserver, useInfiniteMovies } from "@/hooks";
import { MovieGrid, Typography } from "@/components";
import { LoadingBox, Divider } from "./style";

const SimilarMovies = ({ movieId }) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    loading,
    error,
  } = useInfiniteMovies("similar", movieId);

  const observerTarget = useIntersectionObserver({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    enabled: hasNextPage,
  });

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  const movies =
    data?.pages
      .flatMap((page) => page.results)
      .filter((movie) => movie.poster_path) || [];

  if (movies.length === 0) {
    return <Typography>유사한 영화가 없습니다.</Typography>;
  }

  return (
    <>
      <Divider />
      <MovieGrid movies={movies} title="비슷한 영화" padding="20px 220px" />

      <LoadingBox ref={observerTarget}>
        {isFetchingNextPage && <Typography>더 불러오는 중...</Typography>}
      </LoadingBox>
    </>
  );
};

export default SimilarMovies;
