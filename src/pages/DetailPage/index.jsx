import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../../api/fetch";
import styled from "styled-components";

const Details = () => {
  let { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [activeTab, setActiveTab] = useState("info");
  const [director, setDirector] = useState("");
  const [castList, setCastList] = useState("");

  useEffect(() => {
    const getDetail = async () => {
      try {
        const data = await fetchData(`/movie/${id}`);
        setDetail(data);

        const credits = await fetchData(`/movie/${id}/credits`);
        setDirector(credits.crew.find((c) => c.job === "Director")?.name || "");
        setCastList(
          credits.cast
            .slice(0, 5)
            .map((c) => c.name)
            .join(", ")
        );
      } catch (err) {
        console.error(err);
      }
    };
    getDetail();
  }, [id]);

  if (!detail) return <div>Loading...</div>;

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

      <Tabs>
        <Tab active={activeTab === "info"} onClick={() => setActiveTab("info")}>
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

      {activeTab === "info" && (
        <>
          <Content>
            <Poster
              src={`https://image.tmdb.org/t/p/original${detail.poster_path}`}
              alt={detail.title}
            />
            <InfoColumn>
              <div>장르: {detail.genres.map((g) => g.name).join(", ")}</div>
              <div>감독: {director}</div>
              <div>출연: {castList}</div>
              <Divider />
              <Overview>{detail.overview}</Overview>
            </InfoColumn>
          </Content>
        </>
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
  position: relative;
  overflow: hidden;
`;

export const BannerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14px;
`;

export const TitleWrapper = styled.div`
  position: absolute;
  bottom: 144px; // 바텀에서 164px
  left: 220px; // 왼쪽에서 220px
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const MovieTitle = styled.h1`
  font-size: 72px;
  font-weight: 700;
  margin: 0;
`;

export const MovieInfo = styled.div`
  font-size: 24px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.85);
  display: flex;
  gap: 24px; // info 항목 간격
`;

export const Tabs = styled.div`
  display: flex;
  margin-top: 99px;
  padding-left: 225px;
`;

export const Tab = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  color: ${(props) => (props.active ? "#fff" : "rgba(255,255,255,0.6)")};
  font-weight: ${(props) => (props.active ? "700" : "400")};
  border-bottom: ${(props) => (props.active ? "2px solid #fff" : "none")};
  transition: color 0.2s, border-bottom 0.2s;
`;

export const Content = styled.div`
  display: flex;
  margin-top: 68px;
  gap: 40px;
  padding: 0 225px;
`;

export const Poster = styled.img`
  width: 337px;
  height: 496px;
  border-radius: 8px;
  object-fit: cover;
`;

export const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`;

export const Divider = styled.hr`
  border: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  margin: 20px 0;
`;

export const Overview = styled.p`
  line-height: 1.6;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
`;
