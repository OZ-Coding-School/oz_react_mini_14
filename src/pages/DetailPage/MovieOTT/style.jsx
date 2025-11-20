import styled from "@emotion/styled";

export const Content = styled.div`
  display: flex;
  margin-top: 68px;
  padding: 0 225px;
  margin-bottom: 172px;

  @media (max-width: 768px) {
    margin-top: 40px;
    padding: 0 16px;
  }
`;

export const ContentBox = styled.div`
  width: 100%;
`;

export const TitleSection = styled.div`
  margin-bottom: 40px;

  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

export const ProviderList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProviderItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 0;
  position: relative;

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

export const ProviderInfo = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

export const ProviderLogo = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

export const Divider = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
`;

export const NoProvider = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 48px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 32px 16px;
  }
`;

export const Attribution = styled.div`
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;
