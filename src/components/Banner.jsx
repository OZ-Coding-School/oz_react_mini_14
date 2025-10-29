import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../api/fetch";

const Banner = () => {
  const [movies, setMovies] = useState([]);
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
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1.6}
        centeredSlides={true}
        loop={movies.length >= 3}
        navigation={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        breakpoints={{
          1024: { slidesPerView: 3 },
          786: { slidesPerView: 2 },
          0: { slidesPerView: 1.6 },
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

  .swiper {
    position: relative;
    width: 100%;
    height: auto;
  }

  .swiper-slide {
    border-radius: 20px;
    transform: scale(0.85);
    opacity: 0.5;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .swiper-slide-active {
    transform: scale(1);
    opacity: 1;
    box-shadow: 0px 0px 45.34px rgba(0, 0, 0, 0.69);
  }

  /* 블러 효과 양 옆 슬라이드 */
  .swiper-slide:not(.swiper-slide-active) img {
    filter: blur(40px);
    transform: scale(0.95);
    transition: filter 0.3s ease, transform 0.3s ease;
  }

  /* 네비게이션 버튼 */
  .swiper-button-prev,
  .swiper-button-next {
    width: 80px;
    height: 80px;
    top: 50%;
    transform: translateY(-50%);
    color: white;
  }

  .swiper-button-next {
    right: 152px;
  }

  .swiper-button-prev {
    left: 152px;
  }

  /* 페이지네이션 */
  .swiper-pagination {
    position: absolute !important;
    margin-top: 30px;
    bottom: 0px !important;
    left: 0;
    width: 100%;
    text-align: center;
    z-index: 20 !important;
  }

  .swiper-pagination-bullet {
    background: #d9d9d9 !important;
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }

  .swiper-pagination-bullet-active {
    background: #ff1a86 !important;
  }
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
    height: auto;
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
