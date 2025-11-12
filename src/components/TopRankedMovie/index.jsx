import React from "react";
import { useNavigate } from "react-router-dom";
import { useFetchData } from "@/hooks/useFetchData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

//스타일
import { PageContainer } from "@components/common/Container";
import SectionTitle from "@components/common/SectionTitle";
import Typography from "@components/common/Typhography";
import Icon from "@components/common/Icon";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
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
    data: topRagedData,
    loading,
    error,
  } = useFetchData("/movie/top_rated");

  if (loading) return <Typography>Loading...</Typography>;
  if (error)
    return (
      <div>
        <Typography>Error: {error.message}</Typography>
      </div>
    );

  const topRated = topRagedData?.results?.slice(0, 10) || [];

  return (
    <PageContainer>
      <SectionTitle
        title="KINEMA HOT 랭킹"
        showMoreButton={true}
        onMoreClick={() => navigate("/movie/top_ranked")}
      />

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
          <Icon icon={faChevronLeft} size="20px" />
        </CustomNavButton>
        <CustomNavButton className="custom-next" $isNext>
          <Icon icon={faChevronRight} size="20px" />
        </CustomNavButton>
      </SwiperContainer>
    </PageContainer>
  );
};

export default TopRankedMovie;
