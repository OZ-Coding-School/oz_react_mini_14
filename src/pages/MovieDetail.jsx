import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetail.css";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const baseUrl = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const fetchDetail = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          },
        }
      );

      const data = await res.json();
      setMovie(data);
    };

    fetchDetail();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="Movie-Detail">
      <div className="poster">
        <img src={`${baseUrl}${movie.poster_path}`} alt="" />
      </div>

      <div className="info">
        <div className="title-rating">
          <div className="title">{movie.title}</div>
          <div className="rating">{movie.vote_average}</div>
        </div>

        <div className="genre">
          {movie.genres?.map((g) => (
            <div key={g.id}>{g.name}</div>
          ))}
        </div>

        <div className="summary">{movie.overview}</div>
      </div>
    </div>
  );
};

export default MovieDetail;
