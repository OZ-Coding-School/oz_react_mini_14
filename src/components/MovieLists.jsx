import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../api/fetch";
import styled from "styled-components";

const PopularMovie = () => {
  const [popular, setPopular] = useState([]);
  // const [topRated, setTopRated] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const [popularData] = await Promise.all([
          fetchData("/movie/popular"),
          fetchData("/movie/top_rated"),
        ]);
        setPopular(popularData.results);
        // setTopRated(topRatedData.results);
      } catch (error) {
        console.error("데이터 불러오기 실패", error);
      }
    };
    loadMovies();
  }, []);

  return (
    <Container>
      <Title>지금 Hot한 영화</Title>
      <Grid>
        {popular.map((movie) => (
          <Card key={movie.id} onClick={() => navigate(`/movie/${movie.id}`)}>
            <Poster
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <MovieTitle>{movie.title}</MovieTitle>
          </Card>
        ))}
      </Grid>

      {/* <Title>평점 높은 영화</Title>
      <Grid>
        {topRated.map((movie) => (
          <Card key={movie.id} onClick={() => navigate(`/movie/${movie.id}`)}>
            <Poster
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <MovieTitle>{movie.title}</MovieTitle>
          </Card>
        ))}
      </Grid> */}
    </Container>
  );
};

export default PopularMovie;

const Container = styled.div`
  padding: 80px;
  max-width: 1751;
  margin: 0 auto;
  position: relative;
  z-index: 0;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 24px;
  color: #fff;
  padding-left: 30px;
`;

const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 0;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 700px) {
    grid-template-columns: repeat(1, 1fr);
  }
  @media (max-width: 450px) {
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
`;

const Poster = styled.img`
  width: 270px;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05); /* 살짝 확대 */
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3); /* 그림자 효과 */
    z-index: 10;
  }
`;

// 영화 제목
const MovieTitle = styled.p`
  margin-top: 8px;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
`;
