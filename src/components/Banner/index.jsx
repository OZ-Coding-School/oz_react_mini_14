import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { useFetchData } from "@/hooks/useFetchData";
import { SWIPER_CONFIG, truncateText } from "./bannerConfig";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Typography from "@components/common/Typhography";

//style import
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
("./BannerSwiper.css");

import { BannerContainer, ImgWrapper, Overlay } from "./style";

const Banner = () => {
  const { data, loading, error } = useFetchData("/movie/now_playing");
  const navigate = useNavigate();

  const movies = data?.results || [];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error : {error.message}</div>;
  if (movies.length === 0) return null;

  return (
    <BannerContainer>
      <Swiper modules={[Navigation, Pagination, Autoplay]} {...SWIPER_CONFIG}>
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <ImgWrapper onClick={() => navigate(`/movie/${movie.id}`)}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt={movie.title}
              />
            </ImgWrapper>
            <Overlay>
              <Typography variant="h1" tag="h2">
                {movie.title}
              </Typography>
              <Typography variant="body" tag="p">
                {truncateText(movie.overview, 20)}
              </Typography>
            </Overlay>
          </SwiperSlide>
        ))}
      </Swiper>
    </BannerContainer>
  );
};

export default Banner;
