import { useNavigate } from "react-router-dom";
import "./MovieCard.scss";

const BASE_URL = import.meta.env.VITE_IMG_BASE_URL;

function MovieCard({ data }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/detail/${data.id}`);
  };
  // console.log(data.id);
  return (
    <div className="MovieCard-Container">
      <p className="MovieCard-Image">
        <img
          src={`${BASE_URL}${data.poster_path}`}
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
