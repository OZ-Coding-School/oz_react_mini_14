// BannerStyle.js
import styled from "styled-components";

export const Container = styled.section`
  margin-top: 0px;
  margin-bottom: 88px;

  @media (max-width: 1240px) {
    margin-top: 100px;
  }

  @media (max-width: 9860px) {
    margin-top: 140px;
  }

  @media (max-width: 768px) {
    margin-top: 200px;
  }
`;

export const Wrap = styled.div`
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Overlay = styled.div`
  position: absolute;
  bottom: 76px;
  left: 40px;
  right: 20px;
  color: #fff;
  z-index: 5; /* 이미지 위에 표시 */
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);

  @media (max-width: 960) {
    bottom: 20px;
    left: 16px;
    right: 16px;
    text-shadow: none;
  }
`;

export const Title = styled.h2`
  font-size: 48px;
  font-weight: 700;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const Description = styled.p`
  font-size: 20px;
  margin: 0;
  line-height: 1.3;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
