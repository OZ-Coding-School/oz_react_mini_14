import styled from "styled-components";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <Card>
      <Link to="/MovieDetail">
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
  width: 200px;
  margin: 10px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  flex-shrink: 0;
`;

const Poster = styled.img`
  width: 100%;
  height: auto;
`;

const Info = styled.div`
  padding: 10px;
`;

const Title = styled.h3`
  font-size: 18px;
  margin: 0;
`;

const Rating = styled.p`
  font-size: 16px;
  color: #888;
`;
