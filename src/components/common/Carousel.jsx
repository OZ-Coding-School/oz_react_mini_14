import styled from "@emotion/styled";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Container = styled.div`
  width: 100%;

  .swiper-wrapper {
    display: flex;
  }
`;

const Carousel = ({
  children,
  data,
  renderItem,
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
        {/* data + renderItem 패턴 */}
        {data && renderItem
          ? data.map((item, index) => (
              <SwiperSlide key={item.id || index}>
                {renderItem(item, index)}
              </SwiperSlide>
            ))
          : /* children 패턴 */
          children && Array.isArray(children)
          ? children.map((child, idx) => (
              <SwiperSlide key={idx}>{child}</SwiperSlide>
            ))
          : null}
      </Swiper>
    </Container>
  );
};

export default Carousel;
