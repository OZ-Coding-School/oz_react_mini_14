// import "./styles/App.css";
import styled from "styled-components";
import MovieCard from "./MovieCard";
import movieListData from "./data/movieListData.json";

export default function App() {
  const movies = movieListData.results;

  return (
    <div className="MovieList">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

const MovieList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  padding: 20px;
  overflow-x: auto;
  scroll-behavior: smooth;
  white-space: nowrap;
  &::-webkit-scrollbar {
    display: none;
  }
`;
