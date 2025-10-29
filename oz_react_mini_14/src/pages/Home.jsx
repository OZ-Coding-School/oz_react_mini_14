import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { fetchPopularMovies } from "../api/tmdb";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPopularMovies().then((data) => setMovies(data));
  }, []);

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
        loop
        className="pb-8"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div onClick={() => navigate(`/details/${movie.id}`)}>
              <MovieCard
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
              title={movie.title}
              poster_path={movie.poster_path}
              vote_average={movie.vote_average}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
