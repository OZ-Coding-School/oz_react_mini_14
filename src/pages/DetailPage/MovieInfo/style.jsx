import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  margin-top: 68px;
  gap: 40px;
  padding: 0 225px;
  margin-bottom: 172px;

  @media (max-width: 768px) {
    margin-top: 40px;
    padding: 0 16px;
    z-index: 11;
  }
`;

export const ContentBox = styled.div`
  display: flex;
  gap: 40px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: row;
    gap: 16px;
    /* ✅ 배경만 투명하게 - ::before 사용 */
    position: relative;
    border: 0.4px solid rgba(108, 117, 133);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    padding: 20px;

    /* 배경 레이어 */
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(-350deg, #ff1a66 0%, #353a42 32%);
      opacity: 0.3; /* 배경만 투명 */
      border-radius: 12px;
      z-index: -1; /* 뒤로 보내기 */
    }
  }
`;

export const Poster = styled.img`
  width: 337px;
  height: 496px;
  border-radius: 8px;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 120px;
    height: 180px;
    flex-shrink: 0;
  }
`;

export const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

export const InfoRow = styled.div`
  display: flex;
  gap: 12px;
  font-size: 14px;

  @media (max-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    font-size: 12px;
  }
`;

export const Label = styled.span`
  font-weight: 700;
  min-width: 60px;

  @media (max-width: 768px) {
    min-width: 40px;
  }
`;

export const Value = styled.span`
  color: rgba(255, 255, 255, 0.8);
  flex: 1;
`;

export const Divider = styled.hr`
  border: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  margin: 20px 0;

  @media (max-width: 768px) {
    margin: 12px 0;
  }
`;

export const Overview = styled.p`
  line-height: 1.6;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);

  @media (max-width: 768px) {
    font-size: 12px;
    line-height: 1.5;
  }
`;
