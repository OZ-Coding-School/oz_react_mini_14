import styled from "@emotion/styled";

export const SwiperContainer = styled.div`
  position: relative;
  padding: 0 60px;

  &:hover .custom-prev,
  &:hover .custom-next {
    opacity: 1;
  }

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

export const CustomNavButton = styled.button`
  position: absolute;
  top: 40%;
  transform: translateY(-40%);
  ${(props) => (props.$isNext ? "right: 20px;" : "left: 20px;")}

  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  border: 0.8px solid ${(props) => props.theme.colors.text};

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  padding: 0;

  opacity: 0;
  transition: opacity 0.3s ease, background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }

  &:focus {
    outline: none;
  }

  &.swiper-button-disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const RankingCard = styled.div`
  position: relative;
  width: 200px;
  height: 300px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  /* 카드와 카드 사이 간격 */
  margin-right: 20px;

  /* 10번 이상일 때 카드 너비 증가 */
  ${(props) =>
    props.$rank >= 8 &&
    `
    width: 240px;
  `}

  @media (max-width: 1240px) {
    width: 180px;
    height: 270px;
    margin-right: 16px;

    ${(props) =>
      props.$rank >= 10 &&
      `
      width: 220px;
    `}
  }

  @media (max-width: 960px) {
    width: 160px;
    height: 240px;
    margin-right: 12px;

    ${(props) =>
      props.$rank >= 10 &&
      `
      width: 190px;
    `}
  }

  @media (max-width: 768px) {
    width: 140px;
    height: 210px;
    margin-right: 12px;

    ${(props) =>
      props.$rank >= 10 &&
      `
      width: 170px;
    `}
  }
`;

export const RankNumber = styled.div`
  position: absolute;
  bottom: 30px;
  left: ${(props) => {
    if (props.$rank === 1) return "4px";
    if (props.$rank >= 8) return "-4px"; // 10번: 0 안 가려지게
    return "0px";
  }};
  font-size: 180px;
  font-weight: 900;
  font-family: ${(props) => props.theme.font.family};
  color: transparent;
  -webkit-text-stroke: 5px ${(props) => props.theme.colors.text};
  z-index: 1;
  pointer-events: none;
  line-height: 1;
  margin-left: 4px;

  @media (max-width: 1240px) {
    font-size: 180px;
    left: -16px;
    -webkit-text-stroke: 4px ${(props) => props.theme.colors.text};
  }

  @media (max-width: 960px) {
    font-size: 140px;
    left: -16px;
    -webkit-text-stroke: 3px ${(props) => props.theme.colors.text};
  }

  @media (max-width: 768px) {
    font-size: 100px;
    left: -8px;
    -webkit-text-stroke: 2px ${(props) => props.theme.colors.text};
  }
`;

export const Poster = styled.img`
  width: 160px;
  height: 240px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  display: block;
  margin-left: 56px;
  z-index: 2;

  /* 10번째 슬라이드만 margin-left 더 넓게! */
  .swiper-slide:nth-of-child(10) & {
    margin-left: 75px; /* 👈 10번만 더 넓게 */
  }

  @media (max-width: 1240px) {
    width: 140px;
    height: 210px;
    margin-left: 45px;

    .swiper-slide:nth-of-child(10) & {
      margin-left: 65px;
    }
  }

  @media (max-width: 960px) {
    width: 120px;
    height: 180px;
    margin-left: 35px;

    .swiper-slide:nth-of-child(10) & {
      margin-left: 55px;
    }
  }

  @media (max-width: 768px) {
    width: 100px;
    height: 150px;
    margin-left: 25px;

    .swiper-slide:nth-of-child(10) & {
      margin-left: 40px;
    }
  }
`;
