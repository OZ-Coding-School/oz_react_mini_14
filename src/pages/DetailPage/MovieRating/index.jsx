import React, { useState } from "react";
import { useRating, useAuth } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { Typography, Icon } from "@/components";
import {
  Content,
  ContentBox,
  TitleSection,
  RatingSelectSection,
  StarContainer,
  StarButton,
  LoginPrompt,
  LoginLink,
  RatingInfoGrid,
  InfoBox,
  AverageBox,
  StarsDisplay,
  DeleteButton,
} from "./style";

const MovieRating = ({ detail, movieId }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hoverRating, setHoverRating] = useState(0);

  // useRating 훅 사용
  const { rating, loading, saving, saveRating, deleteRating } = useRating(
    movieId,
    detail.title,
    detail.poster_path
  );

  // TMDB 평점을 5점 만점으로 변환
  const tmdbRating = detail.vote_average
    ? (detail.vote_average / 2).toFixed(1)
    : 0;

  const handleStarClick = async (newRating) => {
    if (!user) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
      return;
    }

    const success = await saveRating(newRating);
    if (success) {
      alert("평점이 저장되었습니다!");
    }
  };

  const handleDeleteRating = async () => {
    if (window.confirm("평점을 삭제하시겠습니까?")) {
      const success = await deleteRating();
      if (success) {
        alert("평점이 삭제되었습니다.");
      }
    }
  };

  if (loading) {
    return <div>평점 불러오는 중...</div>;
  }

  const renderInteractiveStar = (currentRating) =>
    [1, 2, 3, 4, 5].map((star) => (
      <StarButton
        key={star}
        onClick={() => handleStarClick(star)}
        onMouseEnter={() => setHoverRating}
        onMouseLeave={() => setHoverRating(0)}
      >
        <Icon
          name="starSolid"
          size="56px"
          color={star <= (hoverRating || currentRating) ? "#ff1a66" : "#d9d9d9"}
        />
      </StarButton>
    ));

  const renderDisplayStars = (currentRating, size = "30px") =>
    [1, 2, 3, 4, 5].map((star) => (
      <div key={star} style={{ display: "flex" }}>
        <Icon
          name="starSolid"
          size={size}
          color={star <= currentRating ? "#ff1a66" : "d9d9d9"}
        />
      </div>
    ));

  return (
    <Content>
      <ContentBox>
        <TitleSection>
          <Typography variant="h3">별점을 선택해주세요.</Typography>
        </TitleSection>
        {/* 상단: 별점 선택 섹션 */}
        <RatingSelectSection>
          <StarContainer>{renderInteractiveStar(rating)}</StarContainer>

          {!user && (
            <LoginPrompt>
              <LoginLink onClick={() => navigate("/login")}>로그인</LoginLink>
              <Typography
                variant="bodyMedium"
                style={{ display: "inline", marginLeft: "4px" }}
              >
                하고 평점을 남겨보세요!
              </Typography>
            </LoginPrompt>
          )}
        </RatingSelectSection>

        {/* 하단: 평점 정보 박스 2개 */}
        <RatingInfoGrid>
          {/*실관람객 평점 (TMDB) */}
          <InfoBox>
            <Typography variant="h3">실관람객평점</Typography>

            <AverageBox>
              <Typography variant="body">
                {detail.vote_average?.toFixed(1) || 0} / 10점
              </Typography>
              <StarsDisplay>
                {renderDisplayStars(Math.round(tmdbRating))}
              </StarsDisplay>
            </AverageBox>
          </InfoBox>

          {/* 내 평점 */}
          <InfoBox>
            <Typography variant="h3">내 평점</Typography>

            <AverageBox>
              <Typography variant="body">
                {rating > 0
                  ? `내가 준 평점: ${rating * 2}점`
                  : user
                  ? "아직 평점을 주지 않았습니다"
                  : "로그인 후 평점을 남겨보세요"}
              </Typography>
              <StarsDisplay>{renderDisplayStars(rating)}</StarsDisplay>
            </AverageBox>

            {rating > 0 && user && (
              <DeleteButton onClick={handleDeleteRating} disabled={saving}>
                <Typography variant="bodyMedium" style={{ fontWeight: "600" }}>
                  {saving ? "처리중..." : "평점 삭제"}
                </Typography>
              </DeleteButton>
            )}
          </InfoBox>
        </RatingInfoGrid>
      </ContentBox>
    </Content>
  );
};
export default MovieRating;
