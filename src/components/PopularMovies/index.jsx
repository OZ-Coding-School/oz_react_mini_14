import React from "react";
import { useNavigate } from "react-router-dom";
import { useInfiniteMovies, useIntersectionObserver } from "@/hooks";
import { Grid, CardWrapper, LoadingBox } from "./style";
import {
  PageContainer,
  SectionTitle,
  MovieCard,
  Typography,
} from "@/components";

const ITEMS_PER_PAGE = 18;

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

  // const allMovies = data?.pages.flatMap((page) => page.results) || [];
  const allMovies =
    data?.pages
      .flatMap((page) => page.results.slice(0, ITEMS_PER_PAGE))
      .filter((movie) => movie.poster_path) || [];

  return (
    <PageContainer>
      <SectionTitle
        title="지금 Hot한 영화"
        showMoreButton={true}
        onMoreClick={() => navigate("/popular")}
      />
      <Grid>
        {allMovies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <CardWrapper key={movie.id}>
              <MovieCard
                title={movie.title}
                poster={movie.poster_path}
                size="w500"
                onClick={() => navigate(`/movie/${movie.id}`)}
              />
            </CardWrapper>
          ))}
      </Grid>

      {/* 자동로딩영역 */}
      <LoadingBox ref={observerTarget}>
        {isFetchingNextPage && <Typography>더 불러오는 중...</Typography>}
      </LoadingBox>
    </PageContainer>
  );
};

export default PopularMovies;
