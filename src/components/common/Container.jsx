import styled from "@emotion/styled";

export const PageContainer = styled.section`
  margin: 0 auto;
  padding: 0 100px;
  margin-bottom: 40px;

  @media (max-width: 1240px) {
    padding: 0 40px;
  }
  @media (max-width: 960px) {
    padding: 0 24px;
    margin-bottom: 32px;
  }
  @media (max-width: 768px) {
    padding: 0 20px;
    margin-bottom: 24px;
  }
`;
