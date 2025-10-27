import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./MovieCards.css";

const MovieCards = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/movieListData.json")
      .then((res) => res.json())
      .then((data) => {
        // data.results 배열이 실제로 존재하는지 확인
        if (data.results) setMovies(data.results);
      })
      .catch((err) => console.error("데이터 불러오기 실패:", err));
  }, []);

  return (
    <div className="movie-swiper-container">
      {movies.length === 0 ? (
        <p style={{ color: "#fff" }}>데이터가 없습니다.</p>
      ) : (
        <Swiper
          modules={[Navigation, Pagination, Mousewheel]}
          spaceBetween={20}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          mousewheel
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <div className="movie__poster">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title || movie.name}
                  onClick={() => navigate("/details")}
                />
                <p className="movie__title">{movie.title}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default MovieCards;
