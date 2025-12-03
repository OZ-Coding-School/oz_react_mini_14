// src/components/MovieSwiper.jsx
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Link } from "react-router-dom";
import "./MovieSwiper.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;

const MovieSwiper = () => {
  const [movies, setMovies] = useState([]);

  const fetchTopRated = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=ko-KR",
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
    );

    const data = await res.json();
    setMovies(data.results || []);
  };

  useEffect(() => {
    fetchTopRated();
  }, []);

  return (
    <div className="top-rated-section">
      <h2 className="top-rated-title">Top Rated Movies ⭐</h2>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={10} // 기존 20 → 10 감소
        slidesPerView={6} // 한 줄 더 꽉 채워보임
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        autoHeight={false}
        style={{ height: "360px" }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Link to={`/detail/${movie.id}`}>
              <div className="swiper-movie-card">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <p className="s-title">{movie.title}</p>
                <p className="s-rating">⭐ {movie.vote_average.toFixed(2)}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieSwiper;
