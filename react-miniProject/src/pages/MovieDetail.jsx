import { useParams } from "react-router-dom";
import { useMovieDetailInfo } from "@hooks";
import { LoadingSkeleton } from "@components";
import "./MovieDetail.scss";
import { useSelector } from "react-redux";

const BASE_URL = import.meta.env.VITE_IMG_BASE_URL;

function Genre({ value }) {
  return <span className="genre-Value">{value}</span>;
}

function MovieDetail() {
  const { movieId } = useParams();
  const { movieDetailDatas, loading } = useMovieDetailInfo(movieId);
  const isDarkMode = useSelector((state) => state.themeToggle.isDarkMode);

  if (loading) return <LoadingSkeleton />;
  if (!movieDetailDatas) return <p>로딩 중....</p>;

  return (
    <div
      className={`movie ${isDarkMode ? "dark" : "light"}`}
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(15,32,39,0.8), rgba(32,58,67,0.6), rgba(44,83,100,0.8)), 
          url(${BASE_URL}${movieDetailDatas.backdrop_path})
        `,
        backgroundSize: "cover", // 이미지가 화면 전체를 덮도록
        backgroundPosition: "center center", // 중앙 기준 배치
        backgroundRepeat: "no-repeat", // 반복 안함
      }}
    >
      <div className="detail-poster">
        <img
          src={`${BASE_URL}${movieDetailDatas.poster_path}`}
          alt={`${movieDetailDatas.title}`}
        />
      </div>
      <div className="detail-title">{movieDetailDatas.title}</div>
      <div className="detail-vote_average">
        평점 : {movieDetailDatas.vote_average}
      </div>
      <div className="detail-genre">
        {movieDetailDatas.genres?.map((genre) => (
          <Genre key={genre.id} value={genre.name} />
        ))}
      </div>
      <div className="detail-overview">
        줄거리 : {movieDetailDatas.overview}
      </div>
    </div>
  );
}

export default MovieDetail;
