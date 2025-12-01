import { useEffect, useRef } from "react";
import MovieCard from "@components/MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useFeaturedMovies } from "@hooks/useFeaturedMovies";
import { useInfiniteMoviesStore } from "@contexts/InfiniteMoviesContext";

export default function Home() {
  const loaderRef = useRef(null);

  const { movies, loadMovies, loading, isEnd } = useInfiniteMoviesStore();
  const { featuredMovies, loadingFeatured, error } = useFeaturedMovies();

  useEffect(() => {
    if (movies.length === 0) {
      loadMovies();
    }
  }, [movies, loadMovies]);

  //무한 스크롤 옵저버
  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && loadMovies(),
      { threshold: 0.5 }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loadMovies]);

  const canLoop = featuredMovies.length > 6;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Movie List</h1>

      {/* 에러 UI */}
      {error && <p className="text-center text-red-500 mb-6">{error}</p>}

      {/* 추천 영화 로딩 UI */}
      {loadingFeatured ? (
        <div className="h-60 flex items-center justify-center mb-10">
          <div className="animate-spin h-12 w-12 border-t-4 border-yellow-400 rounded-full" />
        </div>
      ) : featuredMovies.length > 0 ? (
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={12}
          slidesPerView={1}
          breakpoints={{
            480: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
          navigation
          pagination={{ clickable: true }}
          loop={canLoop}
          className="pb-8"
        >
          {featuredMovies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MovieCard {...movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-gray-500 text-center mb-10">
          추천 영화를 불러올 수 없습니다.
        </p>
      )}

      <h2 className="text-2xl font-semibold mt-12 mb-6 text-center">
        모든 영화 보기
      </h2>

      {/* 전체 영화 리스트 */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
        lg:grid-cols-6 xl:grid-cols-7 gap-4 justify-items-center"
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>

      {/* 로딩 스피너 */}
      {loading && (
        <div className="flex justify-center py-10">
          <div className="animate-spin h-12 w-12 border-t-4 border-yellow-400 rounded-full" />
        </div>
      )}

      {/* 무한 스크롤 트리거 */}
      <div ref={loaderRef} className="h-10" />

      {/* 끝 안내 */}
      {isEnd && (
        <p className="text-center py-6 text-gray-500">
          더 이상 불러올 영화가 없습니다.
        </p>
      )}
    </div>
  );
}
