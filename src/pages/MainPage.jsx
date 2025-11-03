import styled from "styled-components";
import Card from "./components/Card.jsx";

import useTmdbTopData from "./data/hooks/useTmdbTopData.js";
import useTmdbMainData from "./data/hooks/useTmdbMainData.js";
import useTmdbKeywordData from "./data/hooks/useTmdbKeywordData.js";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useSearchParams } from "react-router-dom";
import NavigationBar from "./components/NavigationBar.jsx";

// <-------------------- function -------------------->

export default function MainPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("keyword")?.trim();

  const tmdbTop = useTmdbTopData();
  const tmdbMainData = useTmdbMainData();
  const tmdbKeywordData = useTmdbKeywordData(query);

  const tmdbData = query ? tmdbKeywordData : tmdbMainData;

  // <-------------------- return -------------------->

  return (
    <>
      <NavigationBar />
      <Container>
        <Top10>🏆 TOP 10</Top10>
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
          {tmdbTop.slice(0, 10).map((api) => (
            <SwiperSlide>
              <Card movie={api} key={api.id} />
            </SwiperSlide>
          ))}
        </Swiper>

        <Popular>✨ Popular</Popular>
        <MainList>
          {tmdbData.map((movie) => (
            <Card movie={movie} key={movie.id} />
          ))}
        </MainList>
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

const MainList = styled.div`
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
