import movieDetailDatas from "../data/movieDetailData.json";
import "./MovieDetail.scss";

function Genre({ value }) {
  return <span className="genre-Value">{value}</span>;
}

function MovieDetail() {
  // console.log(movieDetailDatas.title);
  return (
    <div className="movie">
      <div className="detail-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movieDetailDatas.poster_path}`}
          alt={`${movieDetailDatas.title}`}
        />
      </div>
      <div className="detail-title">{movieDetailDatas.title}</div>
      <div className="detail-vote_average">
        평점 : {movieDetailDatas.vote_average}
      </div>
      <div className="detail-genre">
        {movieDetailDatas.genres.map((genre) => (
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
