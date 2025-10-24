import styled from "styled-components";
import MovieCard from "./MovieCard";
import movieListData from "./data/movieListData.json";

export default function App() {
  const movies = movieListData.results;

  return (
    <MovieList>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </MovieList>
  );
}

const MovieList = styled.div`
  display: inline-block;
  gap: 16px;
  padding: 20px;
  overflow-x: auto;
  scroll-behavior: smooth;
  white-space: nowrap;
  &::-webkit-scrollbar {
    display: none;
  }
`;
