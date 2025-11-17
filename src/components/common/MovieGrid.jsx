import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import MovieCard from "./MovieCard";

const Container = styled.div`
  margin: 0 auto;
  padding: ${(props) => props.$padding || "20px 220px"};
  margin-bottom: 40px;

  @media (max-width: 1240px) {
    padding: ${(props) => props.$paddingTablet || "50px 100px"};
  }

  @media (max-width: 960px) {
    padding: ${(props) => props.$paddingMobile || "40px 16px"};
    margin-bottom: 32px;
  }
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: white;
  padding: 0;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 24px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 20px;
  padding: 0;
  margin: 32px auto;
  width: 100%;

  @media (max-width: 1240px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 16px;
    padding: 0;
  }

  @media (max-width: 960px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 16px;
    padding: 0;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
    padding: 0;
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    padding: 0;
  }
`;

const MovieGrid = ({
  movies,
  title,
  padding,
  paddingTablet,
  paddingMobile,
}) => {
  return (
    <Container
      $padding={padding}
      $paddingTablet={paddingTablet}
      $paddingMobile={paddingMobile}
    >
      {title && <Title>{title}</Title>}
      <Grid>
        {movies.map((movie, index) => (
          <Link
            key={`${movie.id}-${index}`}
            to={`/movie/${movie.id}`}
            style={{ textDecoration: "none" }}
          >
            <MovieCard
              title={movie.title}
              poster={movie.poster_path}
              size="w500"
            />
          </Link>
        ))}
      </Grid>
    </Container>
  );
};

export default MovieGrid;
