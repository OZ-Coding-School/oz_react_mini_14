import React from "react";
import { useNavigate } from "react-router-dom";
import { useFetchData } from "@/hook/useFetchData";
import styled from "styled-components";
import { PageContainer } from "@components/CommonStyle/ContainerStyle";
import {
  TitleWrap,
  Title,
  PlusBtn,
  P,
  StyledIcon,
} from "./CommonStyle/TitleStyle";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Container } from "@/pages/DetailPage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const TopRankedMovie = () => {
  const navigate = useNavigate();

  const {
    data: topRagedData,
    loading,
    error,
  } = useFetchData("/movie/top_rated");

  if (loading) return <Container>Loading...</Container>;
  if (error)
    return (
      <Container>
        <Message>Error: {error.message}</Message>
      </Container>
    );

  const topRated = topRagedData?.results?.slice(0, 10) || [];

  return (
    <>
      <PageContainer>
        <TitleWrap>
          <Title>KINEMA HOT 랭킹</Title>
          <PlusBtn onClick={() => navigate(`/movie/top_ranked`)}>
            <P>더보기</P>
            <StyledIcon icon={faChevronRight} />
          </PlusBtn>
        </TitleWrap>

        <SwiperContainer>
          <Swiper
            modules={[Navigation]}
            slidesPerView="auto"
            spaceBetween={12}
            navigation={{
              prevEl: ".custom-prev",
              nextEl: ".custom-next",
            }}
            loop={false}
            breakpoints={{
              1440: { slidesPerView: 7, spaceBetween: 24 },
              1240: { slidesPerView: 4, spaceBetween: 20 },
              960: { slidesPerView: 3, spaceBetween: 16 },
              768: { slidesPerView: 3, spaceBetween: 16 },
              0: { slidesPerView: 3, spaceBetween: 16 },
            }}
          >
            {topRated.map((movie, index) => (
              <SwiperSlide key={movie.id}>
                <RankingCard onClick={() => navigate(`/movie/${movie.id}`)}>
                  <RankNumber>{index + 1}</RankNumber>
                  <Poster
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                </RankingCard>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* 커스텀 네비게이션 */}
          <CustomNavButton className="custom-prev">
            <StyledIcon icon={faChevronLeft} />
          </CustomNavButton>
          <CustomNavButton className="custom-next" $isNext>
            <StyledIcon icon={faChevronRight} />
          </CustomNavButton>
        </SwiperContainer>
      </PageContainer>
    </>
  );
};

export default TopRankedMovie;

const SwiperContainer = styled.div`
  position: relative;

  &:hover .custom-prev,
  &:hover .custom-next {
    opacity: 1;
  }
`;

const CustomNavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.$isNext ? "right: 68px;" : "left: 68px;")}

  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  border: 0.8px solid #fff;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;

  opacity: 0;
  transition: opacity 0.3s ease;

  svg {
    color: #fff;
    font-size: 20px;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }

  &.swiper-button-disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const RankingCard = styled.div`
  position: relative;
  width: 200px;
  height: 300px;
  flex-shrink: 0;
  cursor: pointer;

  @media (max-width: 1240px) {
    width: 180px;
    height: 270px;
  }

  @media (max-width: 960px) {
    width: 160px;
    height: 240px;
  }

  @media (max-width: 768px) {
    width: 140px;
    height: 210px;
  }
`;

const RankNumber = styled.div`
  position: absolute;
  bottom: 40px;
  left: 30%;
  transform: translateX(-30%);
  font-size: 200px;
  font-weight: bold;
  color: transparent;
  -webkit-text-stroke: 5px #fff; /* 테두리만 보이게 */
  z-index: 1;

  @media (max-width: 1240px) {
    font-size: 180px;
    bottom: 30px;
    -webkit-text-stroke: 4px #fff;
  }

  @media (max-width: 960px) {
    font-size: 140px;
    bottom: 30px;
    left: 20%;
    transform: translateX(-20%);
    -webkit-text-stroke: 3px #fff;
  }

  @media (max-width: 768px) {
    font-size: 100px;
    bottom: 30px;
    left: 5%;
    transform: translateX(-10%);
    -webkit-text-stroke: 2px #fff;
  }
`;

const Poster = styled.img`
  position: absolute;
  left: 100px;
  width: 160px;
  height: 240px;
  object-fit: cover;
  border-radius: 10px;
  z-index: 2;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

  &:first-child {
    position: absolute;
    top: 20px;
    left: 70px;
  }

  @media (max-width: 1240px) {
    left: 80px;
    width: 140px;
    height: 210px;
  }

  @media (max-width: 960px) {
    left: 70px;
    width: 120px;
    height: 180px;
  }

  @media (max-width: 768px) {
    left: 40px;
    width: 120px;
    height: 180px;
  }
`;

const Message = styled.div`
  color: #fff;
  font-size: 18px;
`;
