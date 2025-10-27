import { useNavigate } from "react-router-dom";
import "./MovieCard.scss";

function MovieCard({ data }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/detail");
  };

  return (
    <div className="MovieCard-Container">
      <p className="MovieCard-Image">
        <img
          src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
          alt={`${data.title}`}
          onClick={handleClick}
        />
      </p>
      <p className="title">{data.title}</p>
      <p className="vote_average">평점 : {data.vote_average}</p>
    </div>
  );
}
export default MovieCard;
