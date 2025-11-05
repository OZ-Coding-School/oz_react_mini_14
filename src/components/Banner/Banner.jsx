import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "./BannerSwiper.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Container, Wrap, Overlay, Title, Description } from "./BannerStyle";
import { useNavigate } from "react-router-dom";
import { useFetchData } from "@hook/useFetchData";

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

  //100자 초과 시 '...'으로 표시되게
  const truncate = (str, n) => {
    return str?.length > n ? str.substring(0, n) + "..." : str;
  };

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
              <Description>{truncate(movie.overview, 20)}</Description>
            </Overlay>
          </SwiperSlide>
        ))}
        ;
      </Swiper>
    </Container>
  );
};

export default Banner;
