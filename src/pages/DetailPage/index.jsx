import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchData } from "@/hooks/useFetchData";
import styled from "styled-components";

const Details = () => {
  let { id } = useParams();

  const { data: detail, loading: detailLoading } = useFetchData(`/movie/${id}`);
  const { data: credits, loading: creditsLoading } = useFetchData(
    `/movie/${id}/credits`
  );

  const [activeTab, setActiveTab] = useState("info");

  if (detailLoading || creditsLoading) return <div>Loading...</div>;
  if (!detail) return <div>영화를 찾을 수 없습니다.</div>;

  const director = credits?.crew.find((c) => c.job === "Director")?.name || "";
  const castList =
    credits?.cast
      .slice(0, 5)
      .map((c) => c.name)
      .join(", ") || "";

  return (
    <Container>
      <Banner bg={`https://image.tmdb.org/t/p/original${detail.backdrop_path}`}>
        <TitleWrapper>
          <MovieTitle>{detail.title}</MovieTitle>
          <MovieInfo>
            <span>{detail.release_date}</span>
            <span>.{detail.runtime}분</span>
            <span>.{detail.genres.map((g) => g.name).join(", ")}</span>
            <span>
              .{detail.production_countries.map((c) => c.name).join(", ")}
            </span>
          </MovieInfo>
        </TitleWrapper>
      </Banner>

      <TabsWrapper>
        <Tabs>
          <Tab
            active={activeTab === "info"}
            onClick={() => setActiveTab("info")}
          >
            기본정보
          </Tab>
          <Tab
            active={activeTab === "rating"}
            onClick={() => setActiveTab("rating")}
          >
            평점
          </Tab>
          <Tab active={activeTab === "ott"} onClick={() => setActiveTab("ott")}>
            OTT 정보
          </Tab>
          <Tab active={activeTab === "etc"} onClick={() => setActiveTab("etc")}>
            기타
          </Tab>
        </Tabs>
      </TabsWrapper>

      {activeTab === "info" && (
        <Content>
          <ContentBox>
            <Poster
              src={`https://image.tmdb.org/t/p/original${detail.poster_path}`}
              alt={detail.title}
            />
            <InfoColumn>
              <InfoRow>
                <Label>장르</Label>
                <Value>{detail.genres.map((g) => g.name).join(", ")}</Value>
              </InfoRow>
              <InfoRow>
                <Label>감독</Label>
                <Value>{director}</Value>
              </InfoRow>
              <InfoRow>
                <Label>출연</Label>
                <Value>{castList}</Value>
              </InfoRow>
              <InfoRow>
                <Label>국가</Label>
                <Value>
                  {detail.production_countries.map((c) => c.name).join(", ")}
                </Value>
              </InfoRow>
              <Divider />
              <Overview>{detail.overview}</Overview>
            </InfoColumn>
          </ContentBox>
        </Content>
      )}
    </Container>
  );
};

export default Details;
export const Container = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  color: white;
  font-family: "Noto Sans KR", sans-serif;
`;

export const Banner = styled.div`
  width: 100vw;
  height: 717px;
  background: url(${(props) => props.bg}) center/cover no-repeat;
  background-position: center top;
  position: relative;
  overflow: hidden;

  /* 모바일 배경 블러 효과 */
  @media (max-width: 768px) {
    height: 467px;
    margin-top: 100px;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url(${(props) => props.bg}) center/cover no-repeat;
      opacity: 0.2;
      z-index: 0;
    }
  }
`;

// export const BannerInfo = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 4px;
//   font-size: 14px;
// `;

export const TitleWrapper = styled.div`
  position: absolute;
  bottom: 144px; // 바텀에서 164px
  left: 220px; // 왼쪽에서 220px
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 768px) {
    left: 16px;
    bottom: 20px;
    z-index: 1;
  }
`;

export const MovieTitle = styled.h1`
  font-size: 72px;
  font-weight: 700;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 24px;
    font-weight: 700;
  }
`;

export const MovieInfo = styled.div`
  font-size: 24px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.85);
  display: flex;
  gap: 24px; // info 항목 간격

  @media (max-width: 768px) {
    display: none; /* 모바일에서 숨김 */
  }
`;

export const TabsWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 99px;
  padding-left: 225px;

  @media (max-width: 768px) {
    margin-top: 40px;
    padding: 0;
    justify-content: center;
  }
`;

export const Tabs = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: 768px) {
    max-width: 294px;
    gap: 4px;
  }
`;

export const Tab = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  color: ${(props) => (props.active ? "#fff" : "rgba(255,255,255,0.6)")};
  font-weight: ${(props) => (props.active ? "700" : "400")};
  border-bottom: ${(props) => (props.active ? "2px solid #fff" : "none")};
  transition: color 0.2s, border-bottom 0.2s;

  @media (max-width: 768px) {
    width: 74px;
    height: 32px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    border: none;
    background-color: ${(props) => (props.active ? "#ff1a66" : "transparent")};
    font-size: 14px;
  }
`;

export const Content = styled.div`
  display: flex;
  margin-top: 68px;
  gap: 40px;
  padding: 0 225px;

  @media (max-width: 768px) {
    margin-top: 40px;
    padding: 0 16px;
    z-index: 11;
  }
`;

export const ContentBox = styled.div`
  display: flex;
  gap: 40px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: row;
    gap: 16px;
    /* ✅ 배경만 투명하게 - ::before 사용 */
    position: relative;
    border: 0.4px solid rgba(108, 117, 133);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    padding: 20px;

    /* 배경 레이어 */
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(-350deg, #ff1a66 0%, #353a42 32%);
      opacity: 0.3; /* 배경만 투명 */
      border-radius: 12px;
      z-index: -1; /* 뒤로 보내기 */
    }
  }
`;

export const Poster = styled.img`
  width: 337px;
  height: 496px;
  border-radius: 8px;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 120px;
    height: 180px;
    flex-shrink: 0;
  }
`;

export const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

export const InfoRow = styled.div`
  display: flex;
  gap: 12px;
  font-size: 14px;

  @media (max-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    font-size: 12px;
  }
`;

export const Label = styled.span`
  font-weight: 700;
  min-width: 60px;

  @media (max-width: 768px) {
    min-width: 40px;
  }
`;

export const Value = styled.span`
  color: rgba(255, 255, 255, 0.8);
  flex: 1;
`;

export const Divider = styled.hr`
  border: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  margin: 20px 0;

  @media (max-width: 768px) {
    margin: 12px 0;
  }
`;

export const Overview = styled.p`
  line-height: 1.6;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);

  @media (max-width: 768px) {
    font-size: 12px;
    line-height: 1.5;
  }
`;
