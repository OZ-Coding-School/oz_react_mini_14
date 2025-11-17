import { useNavigate } from "react-router-dom";
import { useInfiniteMovies, useIntersectionObserver } from "@/hooks";
import { LoadingBox } from "./style";
import {
  PageContainer,
  MovieGrid,
  Typography,
  SectionTitle,
} from "@/components";

const PopularMovies = () => {
  const navigate = useNavigate();

  //무한 스크롤 훅 불러오기
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    loading,
    error,
  } = useInfiniteMovies("popular");

  //자동 로딩
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

  const allMovies =
    data?.pages
      .flatMap((page) => page.results)
      .filter((movie) => movie.poster_path) || [];

  return (
    <PageContainer>
      <SectionTitle
        title="지금 인기있는 영화"
        showMoreButton={true}
        onMoreClick={() => navigate("/popular")}
      />
      <MovieGrid
        movies={allMovies}
        padding="0"
        paddingTablet="0"
        paddingMobile="0"
      />

      {/* 자동로딩영역 */}
      <LoadingBox ref={observerTarget}>
        {isFetchingNextPage && <Typography>더 불러오는 중...</Typography>}
      </LoadingBox>
    </PageContainer>
  );
};

export default PopularMovies;
