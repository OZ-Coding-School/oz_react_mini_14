import { useSelector } from "react-redux";
import MovieCard from "../components/movie-card";
import MovieSwuper from "../components/movie-swiper/MovieSwiper";
import useMovieCardList from "../hooks/useMovieCardList";
import useMovieTopRatedList from "../hooks/useMovieTopRatedList";
import "./MovieMain.scss";
import { useLocation } from "react-router-dom";
import CommonButton from "../components/common/CommonButton";
import LoadingSkeleton from "../components/skeleton/LoadingSkeleton";
import { useMemo } from "react"; //usememo 사용 주석 테스트 주석테스트

function MovieMain() {
  const { movieList, addMovie, loading } = useMovieCardList(); //인기있는 영화데이터 가져오기
  const movieTopRatedList = useMovieTopRatedList(); //평점이 제일 좋은 영화데이터 가져오기
  const searchText = useSelector((state) => state.search.text);
  const isDarkMode = useSelector((state) => state.themeToggle.isDarkMode);
  const location = useLocation();

  const isAddMoiveBtn = location.pathname.includes("/detail");

  const filteredMovies = useMemo(
    () =>
      movieList?.filter((movie) =>
        movie.title.toLowerCase().includes(searchText.toLowerCase())
      ),
    [movieList, searchText]
  );

  if (searchText.length !== 0) {
  }

  if (loading) {
    return (
      <div style={{ minWidth: "1100px" }}>
        <LoadingSkeleton />
      </div>
    );
  }
  //맨처음 und -> falsy
  //0 === und => return null
  if (!movieList.length > 0) {
    return null;
  }

  return (
    <div className={`movieMain-Container ${isDarkMode ? "dark" : "light"}`}>
      <div className="movieMain-movieText">TopRated Movies</div>
      <MovieSwuper movieData={movieTopRatedList} />
      <div className="movieMain-movieText">Populer Movies</div>
      <div className="movieMain-movieCard">
        {filteredMovies?.map((data) => (
          <MovieCard key={data.id} data={data} />
        ))}
      </div>
      <div className="addMoiveBtn">
        <CommonButton disabled={isAddMoiveBtn} onClick={addMovie} type="button">
          ▼ 더보기
        </CommonButton>
      </div>
    </div>
  );
}

export default MovieMain;
