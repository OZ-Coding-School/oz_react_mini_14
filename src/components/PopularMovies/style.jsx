import styled from "@emotion/styled";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 20px;
  padding: 0 80px;
  margin: 32px auto;
  width: 100%;

  @media (max-width: 1240px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 16px;
    padding: 0 24px;
  }

  @media (max-width: 960px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 16px;
    padding: 0 16px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
    padding: 0 16px;
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    padding: 0 12px;
  }
`;

export const CardWrapper = styled.div`
  width: 100%;
  min-width: 0;
  height: 100%;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-8px);
  }
`;

export const LoadingBox = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px 0;
`;
