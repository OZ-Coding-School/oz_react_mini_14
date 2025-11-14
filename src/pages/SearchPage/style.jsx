import styled from "styled-components";

export const Container = styled.div`
  padding: 140px 80px;
  min-height: 100vh;
  color: #fff;

  @media (max-width: 1240px) {
    padding: 120px 60px;
  }

  @media (max-width: 960px) {
    padding: 120px 40px;
    margin-top: 40px;
  }

  @media (max-width: 768px) {
    padding: 120px 16px;
    margin-top: 100px;
  }
`;

export const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

export const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 24px;
`;

export const FilterButton = styled.button`
  display: none;
`;

export const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;

  @media (max-width: 1240px) {
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
  }

  @media (max-width: 960px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`;

export const MovieCard = styled.div`
  cursor: pointer;
  text-align: center;
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 12px;
    transition: transform 0.3s ease;
    display: block;
  }

  &:hover img {
    transform: scale(1.05);
  }

  h3 {
    font-size: 16px;
    font-weight: 500;

    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
`;
