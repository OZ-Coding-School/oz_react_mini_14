import { useLocation } from "react-router-dom";
import { useFetchData, useDebounce } from "@/hooks";
import { PageContainer, MovieGrid, Typography } from "@/components";
import { SearchContainer } from "./style";
import SearchEmpty from "./SearchEmpty";

const SearchPage = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("q") || "";
  const debouncedQuery = useDebounce(searchTerm, 500);

  const endpoint = debouncedQuery
    ? `/search/movie?query=${debouncedQuery}`
    : null;
  const { data, loading } = useFetchData(endpoint);

  const results = data?.results?.filter((movie) => movie.poster_path) || [];

  const renderEmptyState = () => {
    if (loading) {
      return <SearchEmpty type="loading" />;
    }

    if (!searchTerm || searchTerm.trim() === "") {
      return <SearchEmpty type="empty" />;
    }

    if (results.length === 0) {
      return <SearchEmpty type="noResults" searchTerm={searchTerm} />;
    }
    return null;
  };

  const emptyState = renderEmptyState();

  if (emptyState) {
    return <PageContainer>{emptyState}</PageContainer>;
  }

  return (
    <SearchContainer>
      <Typography
        variant="h2"
        style={{ marginBottom: "40px", paddingLeft: "160px" }}
      >
        "{searchTerm}" 검색 결과 ({results.length})
      </Typography>
      <MovieGrid movies={results} padding="0 80px" />
    </SearchContainer>
  );
};

export default SearchPage;
