import styled from "styled-components";

import CardComponent from "../Component/CardComponent.jsx";
import TopApi from "../Api/TopApi.js";
import MainApi from "../Api/MainApi";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// <-------------------- function -------------------->

export default function MainPage() {
  const topApi = TopApi();
  const mainApi = MainApi();

  // <-------------------- return -------------------->

  return (
    <>
      <Container>
        <Top10>TOP 10 🏆</Top10>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          // pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={5}
          loop
          autoplay={{ display: 1000 }}
          speed={600}
          className="topSwiper"
        >
          {topApi.slice(0, 10).map((api) => (
            <SwiperSlide>
              <CardComponent movie={api} key={api.id} />
            </SwiperSlide>
          ))}
        </Swiper>

        <Popular>Popular ✨</Popular>
        <Mainapi>
          {mainApi.map((api) => (
            <CardComponent movie={api} key={api.id} />
          ))}
        </Mainapi>
      </Container>
    </>
  );
}

// <-------------------- styled-components -------------------->

const Top10 = styled.p`
  font-size: 20px;
  font-weight: 800;
  color: #ff0000;
  margin: 0px;
  padding: 20px 0px 10px 100px;
  border: white;
`;

const Popular = styled.p`
  font-size: 20px;
  font-weight: 800;
  color: white;
  padding-left: 100px;
`;

const Mainapi = styled.div`
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

  .Swiper {
    width: 100%;
    padding: 20px 0px;
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
