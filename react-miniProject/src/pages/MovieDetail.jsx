import { useParams } from "react-router-dom";
// import movieDetailDatas from "../data/movieDetailData.json";
import "./MovieDetail.scss";
import useMovieDetailData from "../lib/MovieDetailData";
import LoadingSkeleton from "../Components/skeleton/LoadingSkeleton";

const BASE_URL = import.meta.env.VITE_IMG_BASE_URL;

function Genre({ value }) {
  return <span className="genre-Value">{value}</span>;
}

function MovieDetail() {
  const { movieId } = useParams();
  const { movieDetailDatas, loading } = useMovieDetailData(movieId);
  // const movieDetailDatas = useMovieDetailData(movieId);

  // console.log("movieDetailDatas : " + movieDetailDatas);
  // console.log("loading : " + loading);

  if (loading) return <LoadingSkeleton />;
  if (!movieDetailDatas) return <p>로딩 중....</p>;

  return (
    <div className="movie">
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
