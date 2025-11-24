import styled from "@emotion/styled";

export const LoadingBox = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px 0;
  color: rgba(255, 255, 255, 0.6);
`;

export const Divider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 60px 200px;

  @media (max-width: 768px) {
    margin: 40px 16px;
  }
`;
