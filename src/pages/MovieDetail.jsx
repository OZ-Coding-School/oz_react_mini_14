import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;

// 디테일 페이지
function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function getDetail() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      );
      const data = await res.json();
      setMovie(data);
    }

    getDetail();
  }, [id]);

  if (!movie) return <div style={{ color: "white" }}>Loading...</div>;

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        style={{ width: "300px", borderRadius: "10px" }}
      />
      <p style={{ marginTop: "20px" }}>{movie.overview}</p>
      <p>평점: {movie.vote_average}</p>
    </div>
  );
}

export default MovieDetail;
