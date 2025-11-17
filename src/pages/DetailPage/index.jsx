import { useState } from "react";
import { useParams } from "react-router-dom";
import { getImageUrl } from "@/constants/images";
import { useAuth, useWishlist, useFetchData, useNoOverlay } from "@/hooks";
import { Typography, Icon } from "@/components";
import { DETAIL_PAGE_TABS } from "./tabConfig";
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
  CenteredMessage,
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
    if (!user) return alert("로그인이 필요합니다.");

    const success = await toggleWishlist(detail);
    if (success) {
      alert(
        isWishlisted
          ? "찜 목록에서 제거되었습니다."
          : "찜 목록에 추가되었습니다!"
      );
    }
  };

  // 로딩/에러 상태
  const loading = detailLoading || creditsLoading;
  const error = detailError || creditsError;

  const getErrorMessage = () => {
    if (loading) return "로딩 중...";
    if (error) return "오류가 발생했습니다.";
    return "영화를 찾을 수 없습니다.";
  };

  if (loading || error || !detail) {
    return (
      <Container>
        <CenteredMessage>
          <Typography variant="body">{getErrorMessage()}</Typography>
        </CenteredMessage>
      </Container>
    );
  }

  const ActiveComponent = DETAIL_PAGE_TABS[activeTab].component;

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
            <Typography variant="body" component="span">
              {detail.release_date || "날짜 정보 없음"}
            </Typography>
            {detail.runtime && (
              <Typography variant="body" component="span">
                .{detail.runtime}분
              </Typography>
            )}
            {detail.genres?.length > 0 && (
              <Typography variant="body" component="span">
                .{detail.genres.map((g) => g.name).join(", ")}
              </Typography>
            )}
            {detail.production_countries?.length > 0 && (
              <Typography variant="body" component="span">
                .{detail.production_countries.map((c) => c.name).join(", ")}
              </Typography>
            )}
          </MovieInfoStyle>
        </TitleWrapper>
      </Banner>

      <TabsWrapper>
        <Tabs>
          {Object.entries(DETAIL_PAGE_TABS).map(([key, { label }]) => (
            <Tab
              key={key}
              $active={activeTab === key}
              onClick={() => setActiveTab(key)}
            >
              {label}
            </Tab>
          ))}
        </Tabs>
      </TabsWrapper>

      <ActiveComponent
        detail={detail}
        credits={credits}
        movieId={id}
        movieData={detail}
      />
    </Container>
  );
};

export default Details;
