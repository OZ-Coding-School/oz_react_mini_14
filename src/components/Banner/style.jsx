import styled from "@emotion/styled";

export const BannerContainer = styled.section`
  position: relative;
  margin-top: 100px;
  margin-bottom: 40px;
  height: 644px;

  @media (max-width: 1240px) {
    margin-top: 100px;
  }

  @media (max-width: 960px) {
    margin-top: 140px;
    height: 450px;
  }

  @media (max-width: 768px) {
    margin-top: 200px;
    height: 350px;
  }
`;

export const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;

  img {
    width: 1254px;
    height: 605px;
    object-fit: cover;
  }
`;

export const Overlay = styled.div`
  position: absolute;
  bottom: 76px;
  left: 40px;
  right: 20px;
  color: ${(props) => props.theme.colors.text};
  z-index: 5;
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;

  /* active 슬라이드일 때만 보이기 */
  .swiper-slide-active & {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 960px) {
    bottom: 20px;
    left: 16px;
    right: 16px;
    text-shadow: none;
  }
`;
