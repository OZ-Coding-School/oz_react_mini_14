import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // useParams 추가
import movieListData from "../data/movieListData.json";
import movieDetailData from "../data/movieDetailData.json";
import "./MovieDetail.css";

function MovieDetail() {
  const { id } = useParams(); // URL에서 id 파라미터 가져오기
  const [movieDetail, setMovieDetail] = useState(null);
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    // movieListData에서 해당 id의 영화 찾기
    const foundMovie = movieListData.results.find(
      (movie) => movie.id === parseInt(id)
    );

    if (foundMovie) {
      // 실제로는 해당 영화의 상세 정보를 가져와야 하지만,
      // 지금은 더미 데이터를 사용하므로 foundMovie의 정보를 사용
      setMovieDetail({
        ...movieDetailData, // 기본 구조는 movieDetailData 사용
        title: foundMovie.title,
        backdrop_path: foundMovie.backdrop_path,
        poster_path: foundMovie.poster_path,
        vote_average: foundMovie.vote_average,
        overview: foundMovie.overview,
      });
    }
  }, [id]);

  // 데이터가 로딩 중일 때
  if (!movieDetail) {
    return <div className="detail-container">로딩 중...</div>;
  }

  return (
    <div className="detail-container">
      <div className="detail-backdrop">
        <img
          src={`${imageBaseUrl}${movieDetail.backdrop_path}`}
          alt={movieDetail.title}
          className="detail-backdrop-image"
        />
        <div className="detail-backdrop-overlay"></div>
      </div>

      <div className="detail-content">
        <div className="detail-poster">
          <img
            src={`${imageBaseUrl}${movieDetail.poster_path}`}
            alt={movieDetail.title}
          />
        </div>

        <div className="detail-info">
          <h1 className="detail-title">{movieDetail.title}</h1>

          <div className="detail-rating">
            <span>⭐ {movieDetail.vote_average.toFixed(1)}</span>
          </div>

          <div className="detail-genres">
            {movieDetail.genres.map((genre) => (
              <span key={genre.id} className="genre-tag">
                {genre.name}
              </span>
            ))}
          </div>

          <div className="detail-overview">
            <h3>줄거리</h3>
            <p>{movieDetail.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
