// src/pages/MovieDetail.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetail } from "../api/tmdb";
import { imageBaseUrl } from "../constants/baseUrls";
import "./MovieDetail.css";

function MovieDetail() {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <section className="detail-container">로딩 중...</section>;
  }

  if (!movieDetail) {
    return (
      <section className="detail-container">
        영화 정보를 찾을 수 없습니다.
      </section>
    );
  }

  return (
    <section className="detail-container">
      <figure className="detail-backdrop">
        <img
          src={`${imageBaseUrl}${movieDetail.backdrop_path}`}
          alt={`${movieDetail.title} 배경 이미지`}
          className="detail-backdrop-image"
          loading="lazy"
        />
        <figcaption className="sr-only">
          {movieDetail.title}의 배경 이미지
        </figcaption>
        <div className="detail-backdrop-overlay" />
      </figure>

      <main className="detail-content">
        <aside className="detail-poster">
          <img
            src={`${imageBaseUrl}${movieDetail.poster_path}`}
            alt={`${movieDetail.title} 포스터`}
            loading="lazy"
          />
        </aside>

        <article className="detail-info">
          <header>
            <h1 className="detail-title">{movieDetail.title}</h1>
          </header>

          <section className="detail-rating">
            <span>⭐ {movieDetail.vote_average.toFixed(1)}</span>
          </section>

          <section className="detail-genres">
            {movieDetail.genres.map((genre) => (
              <span key={genre.id} className="genre-tag">
                {genre.name}
              </span>
            ))}
          </section>

          <section className="detail-overview">
            <h2>줄거리</h2>
            <p>{movieDetail.overview}</p>
          </section>
        </article>
      </main>
    </section>
  );
}

export default MovieDetail;
