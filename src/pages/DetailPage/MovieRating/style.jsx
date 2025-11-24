import styled from "@emotion/styled";

export const Content = styled.div`
  display: flex;

  justify-content: center;
  margin-top: 68px;
  margin-bottom: 88px;
  padding: 0 80px;

  @media (max-width: 768px) {
    margin-top: 40px;
    padding: 0 16px;
    margin-bottom: 80px;
  }
`;

export const ContentBox = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 768px) {
    gap: 24px;
  }
`;

export const TitleSection = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`;

export const RatingSelectSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 20px 0;
    gap: 24px;
  }
`;

export const StarContainer = styled.div`
  display: flex;
  gap: 12px;

  svg {
    font-size: 60px !important;
    width: 60px;
    height: 60px;
  }

  @media (max-width: 768px) {
    gap: 8px;

    svg {
      font-size: 30px !important;
      width: 20px;
      height: 20px;
    }
  }
`;

export const StarButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    transform: scale(1.15);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const LoginPrompt = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const LoginLink = styled.span`
  color: ${(props) => props.theme?.colors?.accent || "#ff1a66"};
  cursor: pointer;
  font-weight: 600;
  text-decoration: underline;
  font-size: 16px;

  &:hover {
    color: #e01558;
  }
`;

export const RatingInfoGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;

  @media (max-width: 1248px) {
    gap: 20px;
  }

  @media (max-width: 768px) {
    gap: 16px;
  }

  @media (max-width: 600px) {
    gap: 12px;
  }
`;

export const InfoBox = styled.div`
  width: 489px;
  max-width: 100%;
  min-height: 400px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 40px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(13deg, #ff1a66 0%, #353a42 32%);
    opacity: 0.3;
    border-radius: 12px;
    z-index: -1;
  }

  @media (max-width: 1024px) {
    width: 45%;
    min-width: 320px;
    padding: 32px 24px;
  }

  @media (max-width: 768px) {
    width: 48%;
    min-width: 280px;
    min-height: 350px;
    padding: 24px 16px;
    gap: 20px;
  }

  @media (max-width: 600px) {
    width: 48%;
    min-width: 160px;
    padding: 20px 12px;
    min-height: 320px;
    gap: 16px;
  }
`;

export const AverageBox = styled.div`
  width: 100%;
  height: 160px;
  background-color: #1a1c20;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  text-align: center;

  @media (max-width: 1024px) {
    height: 140px;
  }

  @media (max-width: 768px) {
    height: 120px;
    padding: 0 12px;
  }

  @media (max-width: 600px) {
    height: 100px;
    padding: 0 8px;
  }
`;

export const StarsDisplay = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-start;
  margin-top: 20px;

  svg {
    font-size: 28px !important;
    width: 28px;
    height: 28px;
  }

  @media (max-width: 768px) {
    gap: 4px;

    svg {
      font-size: 18px !important;
      width: 18px;
      height: 18px;
    }
  }

  @media (max-width: 600px) {
    gap: 3px;
  }
`;

export const DeleteButton = styled.button`
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-end;

  &:hover:not(:disabled) {
    background: rgba(255, 26, 102, 0.2);
    border-color: ${(props) => props.theme?.colors?.accent || "#ff1a66"};
    color: ${(props) => props.theme?.colors?.accent || "#ff1a66"};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  @media (max-width: 768px) {
    padding: 10px 16px;
    font-size: 14px;
  }

  @media (max-width: 600px) {
    padding: 8px 12px;
    font-size: 13px;
  }
`;
