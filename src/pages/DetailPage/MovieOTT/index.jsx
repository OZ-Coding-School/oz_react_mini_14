import React from "react";
import { useFetchData } from "@/hooks";
import { getImageUrl } from "@/constants/images";
import { Typography, Button } from "@/components";
import {
  Content,
  ContentBox,
  TitleSection,
  ProviderList,
  ProviderItem,
  ProviderInfo,
  ProviderLogo,
  Divider,
  NoProvider,
  Attribution,
} from "./style";

const MovieOTT = ({ movieId }) => {
  const { data: providers, loading } = useFetchData(
    `/movie/${movieId}/watch/providers`
  );

  const krStreaming = providers?.results?.KR?.flatrate;

  const handleWatch = (providerName) => {
    alert(`${providerName}에서 시청하기`);
  };

  if (loading) {
    return (
      <Content>
        <Typography variant="body">OTT 정보 불러오는 중...</Typography>
      </Content>
    );
  }

  return (
    <Content>
      <ContentBox>
        <TitleSection>
          <Typography variant="h3">어디서 볼 수 있나요?</Typography>
        </TitleSection>

        {!krStreaming || krStreaming.length === 0 ? (
          <NoProvider>
            <Typography
              variant="body"
              style={{
                fontSize: "16px",
              }}
            >
              현재 국내 OTT 서비스에서 제공되지 않습니다.
            </Typography>
          </NoProvider>
        ) : (
          <ProviderList>
            {krStreaming.map((provider, index) => (
              <ProviderItem key={provider.provider_id}>
                <ProviderInfo>
                  <ProviderLogo
                    src={getImageUrl(provider.logo_path, "original")}
                    alt={provider.provider_name}
                  />
                  <Typography
                    variant="body"
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      marginLeft: "20px",
                    }}
                  >
                    {provider.provider_name}
                  </Typography>
                </ProviderInfo>

                {/* 🔥 기존 Button 컴포넌트 사용 */}
                <Button
                  variant="watch"
                  onClick={() => handleWatch(provider.provider_name)}
                >
                  바로보기
                </Button>

                {index < krStreaming.length - 1 && <Divider />}
              </ProviderItem>
            ))}
          </ProviderList>
        )}

        {krStreaming && krStreaming.length > 0 && (
          <Attribution>
            <Typography
              variant="caption"
              style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.4)",
                textAlign: "center",
              }}
            >
              OTT 정보 제공: JustWatch
            </Typography>
          </Attribution>
        )}
      </ContentBox>
    </Content>
  );
};
export default MovieOTT;
