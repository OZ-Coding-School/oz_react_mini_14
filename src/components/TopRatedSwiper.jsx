import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const TopRatedSwiper = () => {
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
    <div style={{ marginTop: "40px" }}>
      <h2 style={{ color: "#fff", marginBottom: "20px" }}>
        Top Rated Movies ⭐
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={6}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div
              style={{
                background: "#1c1c1c",
                padding: "10px",
                borderRadius: "12px",
                textAlign: "center",
              }}
            >
              <img
                src={IMAGE_URL + movie.poster_path}
                alt={movie.title}
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  marginBottom: "10px",
                }}
              />

              <h4
                style={{ color: "#fff", fontSize: "15px", marginBottom: "5px" }}
              >
                {movie.title}
              </h4>

              <p style={{ color: "#f1c40f", fontWeight: "bold" }}>
                ⭐ {movie.vote_average}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopRatedSwiper;
