import "./DetailPage.css";
import { useMovieDetail } from "../context/MovieDetailData";
import React from "react";

function DetailPage() {
  const { selectedMovie, setSelectedMovie } = useMovieDetail();

  if (!selectedMovie) {
    return null;
  }

  return (
    <div className="movie-detail-page">
      <h2>{selectedMovie.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/original${selectedMovie.poster_path}`}
        alt={selectedMovie.title}
      />
      <p>평점: {selectedMovie.vote_average}</p>
      <ul className="movie-genres">
        {selectedMovie.genres &&
          selectedMovie.genres.map((genre, index) => (
            <li key={`${selectedMovie.id}-${index}`}>{genre.name}</li>
          ))}
      </ul>
      <div className="movie-details">
        <p>{selectedMovie.overview}</p>
        <p>Release Date: {selectedMovie.release_date}</p>
        <p>Director: {selectedMovie.director || "정보 없음"}</p>
      </div>
      <button onClick={() => setSelectedMovie(null)}>닫기</button>
    </div>
  );
}
export default DetailPage;
