import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFetchData } from "@hooks/useFetchData";
import { useDebounce } from "@hooks/useDebounce";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

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

  if (loading)
    return (
      <Container>
        <Message>Loading...</Message>
      </Container>
    );
  return (
    <Container>
      <TopSection>
        <Title>
          🔍 "{searchTerm}" 검색 결과 ({results.length}건)
        </Title>
        <FilterButton>
          <FontAwesomeIcon icon={faFilter} />
        </FilterButton>
      </TopSection>

      {results.length > 0 ? (
        <MovieGrid>
          {results.map((movie) => (
            <MovieCard key={movie.id} onClick={() => handleClick(movie.id)}>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/image/no_image.png"
                }
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
            </MovieCard>
          ))}
        </MovieGrid>
      ) : (
        <Message>검색 결과가 없습니다.</Message>
      )}
    </Container>
  );
};

export default SearchPage;

// 스타일 정의
const Container = styled.div`
  padding: 140px 80px;
  min-height: 100vh;
  color: #fff;

  @media (max-width: 1240px) {
    padding: 120px 60px;
  }

  @media (max-width: 960px) {
    padding: 120px 40px;
    margin-top: 40px;
  }

  @media (max-width: 768px) {
    padding: 120px 16px;
    margin-top: 100px;
  }
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 24px;
`;

const FilterButton = styled.button`
  display: none;
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;

  @media (max-width: 1240px) {
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
  }

  @media (max-width: 960px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`;

const MovieCard = styled.div`
  cursor: pointer;
  text-align: center;
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 12px;
    transition: transform 0.3s ease;
    display: block;
  }

  &:hover img {
    transform: scale(1.05);
  }

  h3 {
    font-size: 16px;
    font-weight: 500;

    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
`;

const Message = styled.p`
  font-size: 18px;
  color: #d9d9d9;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
