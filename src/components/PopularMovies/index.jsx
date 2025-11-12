import React from "react";
import { useNavigate } from "react-router-dom";
import { useFetchData } from "@/hooks/useFetchData";
import { PageContainer } from "@components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import MovieCard from "@components/common/MovieCard";
import Typography from "@components/common/Typhography";
import { Grid, CardWrapper } from "./style";

const PopularMovies = () => {
  const navigate = useNavigate();
  const { data: popularData, loading, error } = useFetchData("/movie/popular");

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  const popular = popularData?.results || [];

  return (
    <PageContainer>
      <SectionTitle
        title="지금 Hot한 영화"
        showMoreButton={true}
        onMoreClick={() => navigate("/popular")}
      />
      <Grid>
        {popular
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <CardWrapper key={movie.id}>
              <MovieCard
                title={movie.title}
                poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                onClick={() => navigate(`/movie/${movie.id}`)}
              />
            </CardWrapper>
          ))}
      </Grid>
    </PageContainer>
  );
};

export default PopularMovies;
