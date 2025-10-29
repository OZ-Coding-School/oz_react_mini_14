import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "./BannerSwiper.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../api/fetch";

const Banner = () => {
  const [movies, setMovies] = useState([]);
  const swiperRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchData("/movie/upcoming");
        setMovies(data.results);
      } catch (error) {
        console.error("데이터 불러오기 실패", error);
      }
    };
    loadData();
  }, []);

  return (
    <Container>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1.8}
        centeredSlides={true}
        loop={movies.length >= 3}
        navigation={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        watchSlidesProgress={true}
        watchSlidesVisibility={true}
        breakpoints={{
          1024: { slidesPerView: 3 },
          786: { slidesPerView: 2 },
          0: { slidesPerView: 1.8 },
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Wrap onClick={() => navigate(`/movie${movie.id}`)}>
              <img
                id={movie.id}
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title || movie.name}
              />
            </Wrap>
            <Overlay>
              <Title>{movie.title}</Title>
              <Description>{movie.overview?.slice(0, 20)}...</Description>
            </Overlay>
          </SwiperSlide>
        ))}
        ;
      </Swiper>
    </Container>
  );
};

export default Banner;

const Container = styled.div`
  width: 100%;
  max-height: 644px;
  padding-top: 148px;
  z-index: 1;
  margin-bottom: 88px;
`;

const Wrap = styled.div`
  position: relative;
  width: 100%;
  padding-top: 48%; /* 16:9 비율 유지 */
  overflow: hidden;
  border-radius: 20px;
  background: #000;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
  }
  /* 밑에서 위로 fade되는 그라디언트 */
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 45%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.63), transparent);
    pointer-events: none;
  }
`;
const Overlay = styled.div`
  position: absolute;
  bottom: 76px;
  left: 88px;
  right: 20px;
  color: #fff;
  z-index: 5; /* 이미지 위에 표시 */
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
`;

const Title = styled.h2`
  font-size: 68px;
  font-weight: 700;
  margin: 0;
`;

const Description = styled.p`
  font-size: 20px;
  margin: 0;
  line-height: 1.3;
`;
