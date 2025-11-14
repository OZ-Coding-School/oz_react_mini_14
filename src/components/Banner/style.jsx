import styled from "@emotion/styled";

export const BannerContainer = styled.section`
  position: relative;
  margin-top: 100px;
  margin-bottom: 40px;
  width: 100%;
  height: auto;

  .swiper {
    width: 100%;
    height: 644px;
    overflow: visible;
  }

  .swiper-wrapper {
    align-items: center;
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  /* 네비게이션 버튼 */
  .swiper-button-next,
  .swiper-button-prev {
    color: #fff;
    width: 80px;
    height: 80px;
    border-radius: 50%;

    &::after {
      font-size: 24px;
      font-weight: bold;
    }
  }

  .swiper-button-prev {
    left: 100px;
  }

  .swiper-button-next {
    right: 100px;
  }

  /* 페이지네이션 */
  .swiper-pagination-bullet {
    background: #fff;
    width: 10px;
    height: 10px;
    opacity: 0.5;
  }

  .swiper-pagination-bullet-active {
    opacity: 1;
    background: #ff1a66;
    width: 12px;
    height: 12px;
  }

  @media (max-width: 1240px) {
    margin-top: 100px;
  }

  @media (max-width: 960px) {
    margin-top: 140px;

    .swiper {
      height: 450px;
    }

    .swiper-button-next,
    .swiper-button-prev {
      display: none;
    }
  }

  @media (max-width: 768px) {
    margin-top: 200px;
    margin-bottom: 50px;

    .swiper {
      height: 350px;
    }

    .swiper-pagination-bullet {
      width: 8px;
      height: 8px;
    }

    .swiper-pagination-bullet-active {
      width: 10px;
      height: 10px;
    }
  }
`;

export const SlideContent = styled.div`
  position: relative;
  width: ${(props) => (props.isActive ? "1254px" : "1024px")};
  max-width: ${(props) => (props.isActive ? "1254px" : "1024px")};
  height: 605px;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.5s ease;
  opacity: ${(props) => (props.isActive ? "1" : "0.4")};
  filter: ${(props) => (props.isActive ? "blur(0)" : "blur(8px)")};
  transform: ${(props) => (props.isActive ? "scale(1)" : "scale(0.9)")};

  @media (max-width: 1240px) {
    width: ${(props) => (props.isActive ? "95%" : "85%")};
    max-width: ${(props) => (props.isActive ? "95%" : "85%")};
  }

  @media (max-width: 960px) {
    width: 100%;
    max-width: 100%;
    height: 450px;
    opacity: ${(props) => (props.isActive ? "1" : "0.6")};
    filter: ${(props) => (props.isActive ? "blur(0)" : "blur(4px)")};
  }

  @media (max-width: 768px) {
    height: 350px;
  }
`;

export const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 360px;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0.45) 45%,
      rgba(0, 0, 0, 0) 100%
    );
    pointer-events: none;
    z-index: 1;
  }

  @media (max-width: 960px) {
    &::after {
      height: 200px;
    }
  }
`;

export const Overlay = styled.div`
  position: absolute;
  bottom: 76px;
  left: 40px;
  right: 40px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #fff;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
  animation: fadeInUp 0.5s ease forwards;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 960px) {
    bottom: 40px;
    left: 20px;
    right: 20px;
    text-shadow: none;
  }

  @media (max-width: 768px) {
    bottom: 30px;
    left: 16px;
    right: 16px;
    gap: 4px;
  }
`;
