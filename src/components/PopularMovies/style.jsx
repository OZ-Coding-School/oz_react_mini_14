import styled from "@emotion/styled";

export const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 0;
  padding: 0 30px;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 16px;
    gap: 16px;
  }

  @media (max-width: 375px) {
    grid-template-columns: 1fr;
  }
`;

export const CardWrapper = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-8px);
  }
`;
