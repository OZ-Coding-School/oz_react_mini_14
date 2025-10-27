import { useEffect, useState } from "react";
import MovieCard from "../Components/movie-card";
import movieListDatas from "../data/movieListData.json";
import MovieSwuper from "../Components/movie-swiper/MovieSwiper";
import "./MovieMain.scss";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

function MovieMain() {
  const [movieData, setMoiveData] = useState(movieListDatas.results);
  console.log(API_URL + " / " + API_KEY);

  // useEffect(() => {
  //   // language=ko 로 설정해주어야 한글로 데이터가 들어옴. 영어로 하고 싶으면 'en_US'
  //   const endPoint = `${API_URL}?api_key=${API_KEY}&language=ko&page=1`;

  //   fetch(endPoint)
  //     .then((response) => response.json()) //응답을 json형태로 변경하여 then의 response에 반환
  //     .then((response) => {
  //       setMoiveData([...response.results]); //스프레드연산자를 사용하여 배열에 집어넣음
  //     });
  //   console.log(movieData);
  // }, []);

  //맨처음 und -> falsy
  //0 === und => return null
  if (!movieData.length > 0) {
    return null;
  }

  return (
    <div className="movieMain-Container">
      <MovieSwuper movieData={movieListDatas.results} />
      {movieData?.map((data) => (
        <MovieCard key={data.id} data={data} />
      ))}
    </div>
  );
}

export default MovieMain;
