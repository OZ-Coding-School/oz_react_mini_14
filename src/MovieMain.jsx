// import React from "react";
import styled from "styled-components";
import movieListData from "./data/movieListData.json";
import MovieCard from "./details/MovieCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import { useEffect, useState } from "react";

export default function MovieMain() {
  const OZmovies = movieListData.results;
  // const [tmdbMovies,setTmdbMovies] = useState([]);
  return (
    <>
      <Container>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={5}
          loop
          className="mySwiper"
        >
          {OZmovies.slice(0, 10).map((movie) => (
            <SwiperSlide key={movie.id}>
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>

        <MovieList>
          {OZmovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </MovieList>
      </Container>
    </>
  );
}

// <--------------- styled-components --------------->

const MovieList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* max-width: 1800px; */
  overflow-x: auto;
  gap: 10px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  /* min-width: 800px; */
  margin: 0 auto;
  padding: 0px;
  color: #000000;

  /* Swiper 전용 디자인 */
  .mySwiper {
    width: 100%;
    padding: 20px 0;
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: white;
    opacity: 0.6;
    transition: opacity 0.2s ease, transform 0.2s ease;
  }
  .swiper-button-next:hover,
  .swiper-button-prev:hover {
    opacity: 1;
    transform: scale(1.2);
  }

  .swiper-pagination-bullet {
    background: white;
    opacity: 0.5;
  }
  .swiper-pagination-bullet-active {
    background: #ffb400;
    opacity: 1;
  }
`;
