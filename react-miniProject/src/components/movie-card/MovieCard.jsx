import { Link, useNavigate } from "react-router-dom";
import "./MovieCard.scss";
import { useSelector } from "react-redux";

const BASE_URL = import.meta.env.VITE_IMG_BASE_URL;

function MovieCard({ data }) {
  const navigate = useNavigate();
  const isDarkMode = useSelector((state) => state.themeToggle.isDarkMode);

  // const handleClick = () => {
  //   // navigate(`/detail/${data.id}`);
  // };

  return (
    <div className={`MovieCard-Container ${isDarkMode ? "dark" : "light"}`}>
      <Link to={`/detail/${data.id}`}>
        <p className="MovieCard-Image">
          <img
            src={`${BASE_URL}${data.poster_path}`}
            alt={`${data.title}`}
            // onClick={handleClick}
          />
        </p>
      </Link>
      <p className="title">{data.title}</p>
      <p className="vote_average">평점 : {data.vote_average}</p>
    </div>
  );
}
export default MovieCard;
