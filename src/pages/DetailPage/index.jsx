import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getImageUrl } from "@/constants/images";
import { useAuth, useWishlist, useFetchData, useNoOverlay } from "@/hooks";
import { Typography, Icon } from "@/components";
import MovieInfo from "./MovieInfo";
import MovieRating from "./MovieRating";
import MovieOTT from "./MovieOTT";
import {
  Container,
  Banner,
  TitleWrapper,
  MovieTitle,
  MovieInfo as MovieInfoStyle,
  TabsWrapper,
  Tabs,
  Tab,
  WishlistButton,
} from "./style";

const Details = () => {
  useNoOverlay();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("info");
  const { user } = useAuth();

  const {
    data: detail,
    loading: detailLoading,
    error: detailError,
  } = useFetchData(`/movie/${id}`);
  const {
    data: credits,
    loading: creditsLoading,
    error: creditsError,
  } = useFetchData(`/movie/${id}/credits`);

  const { isWishlisted, saving, toggleWishlist } = useWishlist(id);

  const handleWishlistClick = async () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    const success = await toggleWishlist(detail);
    if (success) {
      alert(
        isWishlisted
          ? "찜 목록에서 제거되었습니다."
          : "찜 목록에 추가되었습니다!"
      );
    }
  };

  // 로딩 체크
  if (detailLoading || creditsLoading) {
    return (
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            color: "white",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Typography>로딩 중...</Typography>
          <div style={{ fontSize: "14px", opacity: 0.6 }}>
            Detail: {detailLoading ? "로딩중" : "완료"} | Credits:{" "}
            {creditsLoading ? "로딩중" : "완료"}
          </div>
        </div>
      </Container>
    );
  }

  // 에러 체크
  if (detailError || creditsError) {
    return (
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            color: "white",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Typography>데이터를 불러오는 중 오류가 발생했습니다.</Typography>
          <div style={{ fontSize: "14px", opacity: 0.6 }}>
            {detailError && <div>Detail Error: {detailError.message}</div>}
            {creditsError && <div>Credits Error: {creditsError.message}</div>}
          </div>
        </div>
      </Container>
    );
  }

  // 데이터 없음
  if (!detail) {
    return (
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            color: "white",
          }}
        >
          <Typography>영화를 찾을 수 없습니다.</Typography>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Banner $bg={getImageUrl(detail.backdrop_path, "original")}>
        <TitleWrapper>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <MovieTitle>{detail.title}</MovieTitle>
            <WishlistButton
              onClick={handleWishlistClick}
              disabled={saving}
              $isWishlisted={isWishlisted}
            >
              <Icon
                name={isWishlisted ? "heartSolid" : "heartRegular"}
                size="28px"
                color={isWishlisted ? "#ff1a66" : "rgba(255, 255, 255, 0.6)"}
              />
            </WishlistButton>
          </div>
          <MovieInfoStyle>
            <span>{detail.release_date || "날짜 정보 없음"}</span>
            <span>{detail.runtime ? `.${detail.runtime}분` : ""}</span>
            <span>
              {detail.genres?.length > 0
                ? `.${detail.genres.map((g) => g.name).join(", ")}`
                : ""}
            </span>
            <span>
              {detail.production_countries?.length > 0
                ? `.${detail.production_countries
                    .map((c) => c.name)
                    .join(", ")}`
                : ""}
            </span>
          </MovieInfoStyle>
        </TitleWrapper>
      </Banner>

      <TabsWrapper>
        <Tabs>
          <Tab
            $active={activeTab === "info"}
            onClick={() => setActiveTab("info")}
          >
            기본정보
          </Tab>
          <Tab
            $active={activeTab === "rating"}
            onClick={() => setActiveTab("rating")}
          >
            평점
          </Tab>
          <Tab
            $active={activeTab === "ott"}
            onClick={() => setActiveTab("ott")}
          >
            OTT 정보
          </Tab>
        </Tabs>
      </TabsWrapper>

      {activeTab === "info" && <MovieInfo detail={detail} credits={credits} />}
      {activeTab === "rating" && <MovieRating movieId={id} detail={detail} />}
      {activeTab === "ott" && <MovieOTT movieId={id} detail={detail} />}
    </Container>
  );
};

export default Details;
