import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "./BannerSwiper.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useFetchData } from "@hooks/useFetchData";

const Banner = () => {
  const { data, loading, error } = useFetchData("/movie/now_playing");
  const [swiperHeight, setSwiperHeight] = useState("644px");
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setSwiperHeight("344px"); // 모바일
      } else if (width <= 960) {
        setSwiperHeight("444px"); // 태블릿 작은 사이즈
      } else if (width <= 1240) {
        setSwiperHeight("544px"); // 태블릿 큰 사이즈
      } else {
        setSwiperHeight("644px"); // 데스크톱
      }
    };

    handleResize(); //초기실행
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container>Error : {error.message}</Container>;
  if (!data?.results) return null;

  const movies = data.results;

  return (
    <Container className="banner-container">
      <Swiper
        modules={[Navigation, Pagination]}
        style={{ height: swiperHeight }}
        slidesPerView={1.6}
        centeredSlides={true}
        loop={movies.length >= 3}
        navigation={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        breakpoints={{
          1240: { slidesPerView: 3 },
          960: { slidesPerView: 2 },
          768: { slidesPerView: 1.6 },
          0: { slidesPerView: 1.6 },
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Wrap onClick={() => navigate(`/movie/${movie.id}`)}>
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
  margin-top: 0px;
  margin-bottom: 88px;

  @media (max-width: 1240px) {
    margin-top: 100px;
  }

  @media (max-width: 9860px) {
    margin-top: 140px;
  }

  @media (max-width: 768px) {
    margin-top: 200px;
  }
`;

const Wrap = styled.div`
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 76px;
  left: 40px;
  right: 20px;
  color: #fff;
  z-index: 5; /* 이미지 위에 표시 */
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);

  @media (max-width: 960) {
    bottom: 20px;
    left: 16px;
    right: 16px;
    text-shadow: none;
  }
`;

const Title = styled.h2`
  font-size: 48px;
  font-weight: 700;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const Description = styled.p`
  font-size: 20px;
  margin: 0;
  line-height: 1.3;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
