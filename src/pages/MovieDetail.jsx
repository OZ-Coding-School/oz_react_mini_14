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

  if (loading) {
    // section(섹션): 페이지 내 구분되는 부분, 여기서는 로딩 안내
    return <section className="detail-container">로딩 중...</section>;
  }

  if (!movieDetail) {
    // section(섹션): 페이지 내 구분되는 부분, 영화 정보 없을 때 안내
    return (
      <section className="detail-container">
        영화 정보를 찾을 수 없습니다.
      </section>
    );
  }

  return (
    // section(섹션): MovieDetail 전체를 감싸는 시맨틱 컨테이너
    <section className="detail-container">
      {/* figure(피규어): 백드롭 이미지와 그 설명을 묶는 시맨틱 태그 */}
      <figure className="detail-backdrop">
        <img
          src={`${imageBaseUrl}${movieDetail.backdrop_path}`}
          alt={`${movieDetail.title} 배경 이미지`}
          className="detail-backdrop-image"
          loading="lazy"
        />
        {/* figcaption(피규어캡션): 시각장애인/스크린리더용 숨김 설명(선택, 필요하면 사용) */}
        <figcaption className="sr-only">
          {movieDetail.title}의 배경 이미지
        </figcaption>
        <div className="detail-backdrop-overlay"></div>
      </figure>

      {/* main(메인): 페이지의 주요 컨텐츠를 묶는 시맨틱 태그 */}
      <main className="detail-content">
        {/* aside(어사이드): 본문 외 부가 정보(포스터) 시맨틱 */}
        <aside className="detail-poster">
          <img
            src={`${imageBaseUrl}${movieDetail.poster_path}`}
            alt={`${movieDetail.title} 포스터`}
            loading="lazy"
          />
        </aside>

        {/* article(아티클): 영화 상세 정보 블록 */}
        <article className="detail-info">
          {/* header(헤더): 상세정보의 타이틀 영역 */}
          <header>
            <h1 className="detail-title">{movieDetail.title}</h1>
          </header>

          {/* section(섹션): 평점 정보 영역, 시맨틱 구조상 구분 */}
          <section className="detail-rating">
            <span>⭐ {movieDetail.vote_average.toFixed(1)}</span>
          </section>

          {/* section(섹션): 장르 정보 영역 */}
          <section className="detail-genres">
            {movieDetail.genres.map((genre) => (
              <span key={genre.id} className="genre-tag">
                {genre.name}
              </span>
            ))}
          </section>

          {/* section(섹션): 줄거리(overview, 오버뷰) 영역 */}
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
