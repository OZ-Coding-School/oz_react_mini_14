import { useState } from "react";
import MovieCard from "../Components/movie-card";
import movieListDatas from "../data/movieListData.json";
import MovieSwuper from "../Components/movie-swiper/MovieSwiper";

function MovieMain() {
  const [movieData, setMoiveData] = useState(movieListDatas.results);

  //맨처음 und -> falsy
  //0 === und => return null
  if (!movieData.length > 0) {
    return null;
  }

  return (
    <>
      <MovieSwuper movieData={movieListDatas.results} />
      {movieData?.map((data) => (
        <MovieCard key={data.id} data={data} />
      ))}
    </>
  );
}

export default MovieMain;
