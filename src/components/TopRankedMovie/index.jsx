import React from "react";
import { useNavigate } from "react-router-dom";
import { useFetchData } from "@/hooks";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { getImageUrl } from "@/constants/images";

import { PageContainer, SectionTitle, Typography, Icon } from "@components";

import "swiper/css";
import "swiper/css/navigation";
import {
  SwiperContainer,
  CustomNavButton,
  RankingCard,
  RankNumber,
  Poster,
} from "./style";

const TopRankedMovie = () => {
  const navigate = useNavigate();

  const {
    data: topRatedData,
    loading,
    error,
  } = useFetchData("/movie/top_rated");

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  const topRated = topRatedData?.results?.slice(0, 10) || [];

  return (
    <PageContainer>
      <SectionTitle
        title="KINEMA HOT 랭킹"
        showMoreButton={true}
        variant="compact"
        onMoreClick={() => navigate("/movie/top_ranked")}
      />

      <SwiperContainer>
        <Swiper
          modules={[Navigation]}
          slidesPerView={7}
          spaceBetween={0}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          breakpoints={{
            1240: { slidesPerView: 7, spaceBetween: 0 },
            960: { slidesPerView: 4, spaceBetween: 0 },
            768: { slidesPerView: 3, spaceBetween: 0 },
            0: { slidesPerView: 3, spaceBetween: 0 },
          }}
        >
          {topRated.map((movie, index) => {
            const rank = index + 1;
            return (
              <SwiperSlide key={movie.id}>
                <RankingCard
                  $rank={rank}
                  onClick={() => navigate(`/movie/${movie.id}`)}
                >
                  <RankNumber $rank={rank}>{rank}</RankNumber>
                  <Poster
                    src={getImageUrl(movie.poster_path)}
                    alt={movie.title}
                  />
                </RankingCard>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* 커스텀 네비게이션 */}
        <CustomNavButton className="custom-prev">
          <Icon name="chevronLeft" size="20px" />
        </CustomNavButton>
        <CustomNavButton className="custom-next" $isNext>
          <Icon name="chevronRight" size="20px" />
        </CustomNavButton>
      </SwiperContainer>
    </PageContainer>
  );
};

export default TopRankedMovie;
