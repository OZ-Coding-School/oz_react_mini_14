import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  color: white;
  font-family: "Noto Sans KR", sans-serif;
`;

export const Banner = styled.div`
  width: 100vw;
  height: 717px;
  background: url(${(props) => props.$bg}) center/cover no-repeat;
  background-position: center top;
  position: relative;
  overflow: hidden;

  /* 모바일 배경 블러 효과 */
  @media (max-width: 768px) {
    height: 467px;
    margin-top: 100px;

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background: url(${(props) => props.$bg}) center/cover no-repeat;
      opacity: 0.2;
      z-index: 0;
    }
  }
`;
export const TitleWrapper = styled.div`
  position: absolute;
  bottom: 144px;
  left: 220px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 768px) {
    left: 16px;
    bottom: 20px;
    z-index: 1;
  }
`;

export const MovieTitle = styled.h1`
  font-size: 72px;
  font-weight: 700;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 24px;
    font-weight: 700;
  }
`;

export const MovieInfo = styled.div`
  font-size: 24px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.85);
  display: flex;
  gap: 24px;

  @media (max-width: 768px) {
    display: none; /* 모바일에서 숨김 */
  }
`;

export const TabsWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 99px;
  padding-left: 225px;

  @media (max-width: 768px) {
    margin-top: 40px;
    padding: 0;
    justify-content: flex-start;
    padding-left: 20px;
  }
`;

export const Tabs = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: 768px) {
    max-width: 294px;
    gap: 4px;
  }
`;

export const Tab = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  color: ${(props) => (props.$active ? "#fff" : "rgba(255,255,255,0.6)")};
  font-weight: ${(props) => (props.$active ? "700" : "400")};
  border-bottom: ${(props) => (props.$active ? "2px solid #fff" : "none")};
  transition: color 0.2s, border-bottom 0.2s;

  @media (max-width: 768px) {
    flex: 1;
    padding: 10px 12px;
    text-align: center;
    font-size: 14px;
    border-radius: 20px;
    border: 1px solid
      ${(props) => (props.$active ? "#ff1a66" : "rgba(255, 255, 255, 0.3)")};
    background-color: ${(props) => (props.$active ? "#ff1a66" : "transparent")};
    white-space: nowrap;
    border-bottom: none;
    color: ${(props) => (props.$active ? "#fff" : "rgba(255,255,255,0.6)")};
    font-weight: ${(props) => (props.$active ? "600" : "400")};
  }
`;

export const WishlistButton = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    transform: scale(1.1);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;

    svg {
      font-size: 20px;
    }
  }
`;
