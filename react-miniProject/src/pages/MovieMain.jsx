import { useMemo } from "react"; //usememo 사용 주석 테스트 주석테스트
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useMovieCardList, useMovieTopRatedList } from "@hooks";
import "./MovieMain.scss";
import {
  MovieCard,
  MovieSwiper,
  CommonButton,
  LoadingSkeleton,
} from "@components";

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
      <MovieSwiper movieData={movieTopRatedList} />
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
