// 무비카드 입니다
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <Card>
      <Link to={`/details`}>
        <Poster
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </Link>
      <Info>
        <Title>{movie.title}</Title>
        <Rating>{movie.vote_average}</Rating>
      </Info>
    </Card>
  );
}

const Card = styled.div`
  width: 18vw;
  max-width: 200px;
  min-width: 150px;
  aspect-ratio: 1/2;
  margin: 10px auto;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  flex-shrink: 0;
`;

const Poster = styled.img`
  width: 100%;
  height: 75%;
  object-fit: cover;
  cursor: pointer;
`;

const Info = styled.div`
  padding: 10px;
`;

const Title = styled.h3`
  font-size: 18px;
  margin: 0;

  // 텍스트가 길 경우 생략 부호(...) 처리
  // 두가지 속성 모두 필요
  overflow: hidden;
  text-overflow: ellipsis;

  white-space: nowrap;
`;

const Rating = styled.p`
  font-size: 16px;
  color: #888;
`;
