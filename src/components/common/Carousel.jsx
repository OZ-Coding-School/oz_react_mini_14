import styled from "@emotion/styled";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/";

const Container = styled.div`
  width: 100%;

  .swiper-wrapper {
    display: flex;
  }
`;

const Carousel = ({
  children,
  sliderPerView = 5,
  spaceBetween = 16,
  loop = false,
  ...swiperProps
}) => {
  return (
    <Container>
      <Swiper
        slidesPerView={sliderPerView}
        spaceBetween={spaceBetween}
        loop={loop}
        {...swiperProps}
      >
        {children.map((child, idx) => {
          <SwiperSlide key={idx}>{child}</SwiperSlide>;
        })}
      </Swiper>
    </Container>
  );
};

export default Carousel;
