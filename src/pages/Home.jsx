import { useEffect, useState, useRef, useCallback } from "react";
import MovieCard from "@components/MovieCard";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { fetchPopularMovies } from "@api/tmdb";

export default function Home() {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const movieIdsRef = useRef(new Set());
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const navigate = useNavigate();
  const loaderRef = useRef(null);

  const loadFeaturedMovies = async () => {
    const popular = await fetchPopularMovies(1);
    const shuffled = popular.sort(() => Math.random() - 0.5);
    setFeaturedMovies(shuffled.slice(0, 20));
  };

  const loadMovies = useCallback(async () => {
    if (loading || isEnd) return;

    setLoading(true);
    const newMovies = await fetchPopularMovies(page);

    if (!newMovies || newMovies.length === 0) {
      setIsEnd(true);
      setLoading(false);
      return;
    }

    const filtered = newMovies.filter(
      (movie) => !movieIdsRef.current.has(movie.id)
    );

    if (filtered.length === 0) {
      setPage((prev) => prev + 1);
      setLoading(false);
      return;
    }

    filtered.forEach((movie) => movieIdsRef.current.add(movie.id));

    setMovies((prev) => [...prev, ...filtered]);
    setPage((prev) => prev + 1);

    setLoading(false);
  }, [page, loading, isEnd]);

  useEffect(() => {
    loadFeaturedMovies();
    loadMovies();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !loading) {
          loadMovies();
        }
      },
      { threshold: 0.5 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => loaderRef.current && observer.unobserve(loaderRef.current);
  }, [loadMovies]);

  const canLoop = featuredMovies.length > 6;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Movie List</h1>

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
            <div onClick={() => navigate(`/details/${movie.id}`)}>
              <MovieCard
                id={movie.id}
                title={movie.title}
                poster_path={movie.poster_path}
                vote_average={movie.vote_average}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <h2 className="text-2xl font-semibold mt-12 mb-4 text-center">
        모든 영화 보기
      </h2>

      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
      lg:grid-cols-6 xl:grid-cols-7 gap-4 justify-items-center"
      >
        {movies.map((movie) => (
          <div key={movie.id} onClick={() => navigate(`/details/${movie.id}`)}>
            <MovieCard
              id={movie.id}
              title={movie.title}
              poster_path={movie.poster_path}
              vote_average={movie.vote_average}
            />
          </div>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-yellow-400"></div>
        </div>
      )}

      <div ref={loaderRef} className="h-10"></div>

      {isEnd && (
        <p className="text-center py-6 text-gray-500">
          더 이상 불러올 영화가 없습니다.
        </p>
      )}
    </div>
  );
}
