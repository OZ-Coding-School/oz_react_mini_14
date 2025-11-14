import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFetchData, useDebounce } from "@/hooks";
import { PageContainer, MovieCard, Typography } from "@components";
import { TopSection, MovieGrid } from "./style";

const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("q") || "";
  const debouncedQuery = useDebounce(searchTerm, 500);

  const endpoint = debouncedQuery
    ? `/search/movie?query=${debouncedQuery}`
    : null;
  const { data, loading } = useFetchData(endpoint);

  const results = data?.results || [];

  const handleClick = (id) => {
    navigate(`/movie/${id}`);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!debouncedQuery) {
    return <Typography>검색어를 입력해주세요.</Typography>;
  }

  if (results.length === 0) {
    return <Typography>검색 결과가 없습니다.</Typography>;
  }
  return (
    <PageContainer>
      <TopSection>
        <Typography variant="h2">
          "{searchTerm}"검색 결과 {results.length}
        </Typography>
      </TopSection>
      <MovieGrid>
        {results
          .filter((movie) => movie.poster_path) // 포스터 있는 것만
          .map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              poster={movie.poster_path}
              onClick={() => handleClick(movie.id)}
            />
          ))}
      </MovieGrid>
    </PageContainer>
  );
};

export default SearchPage;
