// react에서 swiper 사용
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "../movie-card";
import "./MovieSwiper.scss";

// 필요한 기능 모듈 불러오기
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function MovieSwuper({ movieData }) {
  return (
    <div className="swiper-Container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]} // 사용할 모듈들을 배열로 전달
        navigation // 네비게이션 버튼 사용
        pagination={{ clickable: true }} // 페이지네이션 클릭 가능하도록 설정
        autoplay={{ delay: 3000 }} // 3초마다 자동 재생
        spaceBetween={20} //사이 공간 거리
        slidesPerView={4} //화면에 나타내는 view 개수
        style={{ padding: "0 40px" }}
      >
        {movieData?.map((data) => (
          <SwiperSlide key={data.id}>
            <MovieCard data={data} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
