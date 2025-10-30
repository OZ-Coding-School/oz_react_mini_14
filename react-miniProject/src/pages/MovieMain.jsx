import { useSelector } from "react-redux";
import MovieCard from "../Components/movie-card";
import MovieSwuper from "../Components/movie-swiper/MovieSwiper";
import useMovieCardData from "../hooks/useMovieCardData";
import useMovieTopRatedData from "../hooks/useMovieTopRatedData";
import "./MovieMain.scss";

function MovieMain() {
  const movieData = useMovieCardData(); //인기있는 영화데이터 가져오기
  const movieTopRatedData = useMovieTopRatedData(); //평점이 제일 좋은 영화데이터 가져오기
  const searchText = useSelector((state) => state.search.text);
  const isDarkMode = useSelector((state) => state.themeToggle.isDarkMode);

  const filteredMovies = movieData.filter((movie) =>
    movie.title.toLowerCase().includes(searchText.toLowerCase())
  );

  if (searchText.length !== 0) {
  }
  //맨처음 und -> falsy
  //0 === und => return null
  if (!movieData.length > 0) {
    return null;
  }

  return (
    <div className={`movieMain-Container ${isDarkMode ? "dark" : "light"}`}>
      <MovieSwuper movieData={movieTopRatedData} />
      <div className="movieMain-movieCard">
        {filteredMovies?.map((data) => (
          <MovieCard key={data.id} data={data} />
        ))}
      </div>
    </div>
  );
}

export default MovieMain;
