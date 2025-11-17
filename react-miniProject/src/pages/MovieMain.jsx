import { useEffect, useMemo, useRef } from "react"; //usememo 사용 주석 테스트 주석테스트
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
  const { movieList, addMovie, loading, hasMore } = useMovieCardList(); //인기있는 영화데이터 가져오기
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

  const sentinelRef = useRef(null);

  useEffect(() => {
    if (isAddMoiveBtn) return; // 디테일 페이지면 무한스크롤 안함
    if (searchText.length > 0) return;
    if (!sentinelRef.current) return;

    // 브라우저에 IntersectionObserver 지원되는지 확인
    if (typeof IntersectionObserver === "undefined") {
      // 폴백: 버튼 보이게끔 남겨두거나 스크롤 이벤트로 대체 가능
      console.warn("IntersectionObserver가 지원되지 않는 환경입니다.");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          // 로딩 중이거나 더 이상 불러올게 없으면 호출하지 않음
          if (loading) return;
          if (!hasMore) {
            // 더 불러올 데이터가 없으면 observer 연결 해제
            observer.disconnect();
            return;
          }
          addMovie();
        }
      },
      {
        root: null, // 뷰포트 기준
        rootMargin: "50px", // 미리 불러오기: sentinel이 화면으로부터 300px 이내로 들어오면 트리거
        threshold: 1, // sentinel이 10% 보이면 트리거
      }
    );

    observer.observe(sentinelRef.current); //리스트 맨 아래 있는 빈 div(sentinel)를 ‘감시’ 시작.

    // cleanup //컴포넌트가 언마운트되거나
    return () => {
      observer.disconnect();
    }; // addMovie, loading, hasMore 등이 변경될 때 이전 옵저버 제거 → 메모리 누수/중복 observe 방지
  }, [addMovie, loading, hasMore, isAddMoiveBtn, searchText]);

  if (loading && (!movieList || movieList.length === 0)) {
    // 초기 로딩 동안은 스켈레톤 표시
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
      {/* 기존 더보기 버튼(호환성 용도/옵션). 디테일 페이지에서는 버튼 대신 무한스크롤이 동작 */}
      <div
        className="addMoiveBtn"
        style={{ textAlign: "center", padding: "16px 0" }}
      >
        {/* 사용자가 무한스크롤을 원치 않거나 IntersectionObserver가 지원되지 않을 때 이 버튼으로도 로드 가능 */}
        {searchText.length > 0 || (
          <CommonButton
            disabled={isAddMoiveBtn || loading || !hasMore}
            onClick={addMovie}
            type="button"
          >
            ▼ 더보기
          </CommonButton>
        )}
      </div>

      {/* sentinel: 검색 중이 아닐 때만 표시 */}
      {/* sentinel: 화면 하단에서 관찰할 빈 요소 */}
      {searchText.length === 0 && (
        <div ref={sentinelRef} style={{ height: "1px" }} aria-hidden="true" />
      )}
      {/* 로딩 인디케이터 */}
      {loading && (
        <div style={{ textAlign: "center", padding: 12 }}>로딩 중...</div>
      )}
      {!hasMore && (
        <div style={{ textAlign: "center", padding: 12 }}>
          더 이상 불러올 영화가 없습니다.
        </div>
      )}
    </div>
  );
}

export default MovieMain;
