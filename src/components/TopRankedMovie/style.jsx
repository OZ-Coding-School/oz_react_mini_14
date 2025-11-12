import styled from "@emotion/styled";

export const SwiperContainer = styled.div`
  position: relative;
  padding: 0 10px 40px;

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
  top: 50%;
  transform: translateY(-50%);
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

export const RankNumber = styled.div`
  position: absolute;
  bottom: 30px;
  left: -30px;
  font-size: 180px;
  font-weight: 900;
  font-family: ${(props) => props.theme.font.family};
  color: transparent;
  -webkit-text-stroke: 5px ${(props) => props.theme.colors.text};
  z-index: 1;
  pointer-events: none;
  line-height: 1;

  @media (max-width: 1240px) {
    font-size: 180px;
    bottom: -35px;
    left: -25px;
    -webkit-text-stroke: 4px ${(props) => props.theme.colors.text};
  }

  @media (max-width: 960px) {
    font-size: 140px;
    bottom: -30px;
    left: -20px;
    -webkit-text-stroke: 3px ${(props) => props.theme.colors.text};
  }

  @media (max-width: 768px) {
    font-size: 100px;
    bottom: -20px;
    left: -15px;
    -webkit-text-stroke: 2px ${(props) => props.theme.colors.text};
  }
`;

export const Poster = styled.img`
  position: relative;
  width: 160px;
  height: 240px;
  object-fit: cover;
  border-radius: 10px;
  z-index: 2;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  margin-left: 40px;

  @media (max-width: 1240px) {
    width: 140px;
    height: 210px;
    margin-left: 35px;
  }

  @media (max-width: 960px) {
    width: 120px;
    height: 180px;
    margin-left: 30px;
  }

  @media (max-width: 768px) {
    width: 120px;
    height: 180px;
    margin-left: 25px;
  }
`;
