import styled from "@emotion/styled";

//index
export const Content = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 68px;
  margin-bottom: 172px;
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
  gap: 32px;

  @media (max-width: 768px) {
    gap: 24px;
  }
`;

export const TitleSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  border: 1px dashed rgba(255, 255, 255, 0.1);
`;

// ReviewForm
export const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 32px;

  @media (max-width: 768px) {
    padding: 24px 16px;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 16px;
  color: white;
  font-size: 16px;
  font-family: inherit;
  resize: vertical;
  margin: 16px 0 8px 0;

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  &:focus {
    outline: none;
    border-color: #ff1a66;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    min-height: 120px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
  justify-content: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const SubmitButton = styled.button`
  padding: 12px 32px;
  background: #ff1a66;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover:not(:disabled) {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 12px;
  }
`;

export const CancelButton = styled.button`
  padding: 12px 32px;
  background: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    border-color: rgba(255, 255, 255, 0.6);
    background: rgba(255, 255, 255, 0.05);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 12px;
  }
`;

export const LoginPrompt = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 40px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 32px 16px;
  }
`;

export const LoginLink = styled.span`
  color: #ff1a66;
  cursor: pointer;
  font-weight: 600;
  text-decoration: underline;
  font-size: 16px;

  &:hover {
    opacity: 0.8;
  }
`;

export const MyReviewBox = styled.div`
  background: rgba(255, 26, 102, 0.1);
  border: 1px solid rgba(255, 26, 102, 0.3);
  border-radius: 12px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 768px) {
    padding: 24px 16px;
  }
`;

// ===== ReviewList 스타일 =====

export const ReviewCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 24px;
  transition: background 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`;

export const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ReviewDate = styled.div`
  @media (max-width: 768px) {
    align-self: flex-start;
  }
`;

export const ReviewContent = styled.div`
  line-height: 1.6;
`;
