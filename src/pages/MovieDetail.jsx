import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetail } from "../api/tmdb";
import "./MovieDetail.css";

function MovieDetail() {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetail(id);
        setMovieDetail(data);
      } catch (error) {
        console.error("영화 상세 정보 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  // 로딩 중일 때
  if (loading) {
    return <div className="detail-container">로딩 중...</div>;
  }

  // 데이터가 없을 때
  if (!movieDetail) {
    return (
      <div className="detail-container">영화 정보를 찾을 수 없습니다.</div>
    );
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
