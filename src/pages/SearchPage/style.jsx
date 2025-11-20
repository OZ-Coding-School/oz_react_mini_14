import styled from "@emotion/styled";

export const SearchContainer = styled.div`
  padding-top: 140px;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding-top: 100px;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 40px 20px;
`;
