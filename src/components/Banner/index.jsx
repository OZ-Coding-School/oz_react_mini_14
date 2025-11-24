import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useFetchData } from "@/hooks";
import { SWIPER_CONFIG } from "./bannerConfig";
import { truncateText } from "@/utils";
import { getImageUrl } from "@/constants/images";
import { Typography } from "@/components";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { BannerContainer, SlideContent, ImgWrapper, Overlay } from "./style";

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
            {({ isActive }) => (
              <SlideContent isActive={isActive}>
                <ImgWrapper onClick={() => navigate(`/movie/${movie.id}`)}>
                  <img
                    src={getImageUrl(movie.backdrop_path, "original")}
                    alt={movie.title}
                  />
                </ImgWrapper>
                {isActive && (
                  <Overlay>
                    <Typography variant="h1">{movie.title}</Typography>
                    <Typography variant="body" as="p">
                      {truncateText(movie.overview, 20)}
                    </Typography>
                  </Overlay>
                )}
              </SlideContent>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </BannerContainer>
  );
};

export default Banner;
