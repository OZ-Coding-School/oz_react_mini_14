import { useState } from "react";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";
import movieListData from "../data/movieListData.json";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

export default function Home() {
  const [movies] = useState(movieListData.results);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Movie List</h1>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        loop
        className="pb-8"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div onClick={() => navigate("/details")}>
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

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
        {movies.map((movie) => (
          <div key={movie.id} onClick={() => navigate("/details")}>
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
