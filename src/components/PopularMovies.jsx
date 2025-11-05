import React from "react";
import { useNavigate } from "react-router-dom";
import { useFetchData } from "@hook/useFetchData";
import styled from "styled-components";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { PageContainer } from "@components/CommonStyle/ContainerStyle";
import {
  TitleWrap,
  Title,
  PlusBtn,
  P,
  StyledIcon,
} from "@components/CommonStyle/TitleStyle";

const PopularMovies = () => {
  const navigate = useNavigate();

  const { data: popularData, loading, error } = useFetchData("/movie/popular");
  // const { data: topRatedData } = useFetchData("movie/top_rated")

  if (loading)
    return (
      <Container>
        <Message>Loading...</Message>
      </Container>
    );
  if (error)
    return (
      <Container>
        <Message>Error: {error.message}</Message>
      </Container>
    );

  const popular = popularData?.results || [];
  // const topRated = topRatedData?.results || []

  return (
    <Container>
      <TitleWrap>
        <Title>지금 Hot한 영화</Title>
        <PlusBtn>
          <P>더보기</P>
          <StyledIcon icon={faChevronRight} />
        </PlusBtn>
      </TitleWrap>
      <Grid>
        {popular
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <Card key={movie.id} onClick={() => navigate(`/movie/${movie.id}`)}>
              <Poster
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path} `}
                alt={movie.title}
              />
              <MovieTitle>{movie.title}</MovieTitle>
            </Card>
          ))}
      </Grid>
    </Container>
  );
};

export default PopularMovies;

const Container = styled(PageContainer)`
  position: relative;
  z-index: 0;
`;

const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 0;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 375px) {
    grid-template-columns: 1fr;
  }
`;
const Card = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-8px);
  }
`;

const Poster = styled.img`
  width: 100%;
  max-width: 270px;
  height: auto;
  aspect-ratio: 2/3;
  border-radius: 8px;
  object-fit: cover;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
    z-index: 10;
  }
`;

// 영화 제목
const MovieTitle = styled.p`
  margin-top: 8px;
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  line-height: 1.4;
`;

const Message = styled.p`
  font-size: 18px;
  color: #d9d9d9;
  text-align: center;
  margin-top: 60px;
`;
