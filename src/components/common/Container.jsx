import styled from "@emotion/styled";

export const PageContainer = styled.section`
  margin: 0 auto;
  padding: 20 100px;
  margin-bottom: 40px;

  @media (max-width: 1240px) {
    padding: 0 60px;
  }
  @media (max-width: 960px) {
    padding: 0 40px;
    margin-bottom: 32px;
  }
  @media (max-width: 768px) {
    padding: 0 16px;
    margin-bottom: 24px;
  }
`;
