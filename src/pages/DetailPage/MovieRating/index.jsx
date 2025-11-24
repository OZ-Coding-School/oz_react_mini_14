import { useRating, useAuth } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { Typography, StarRating } from "@/components";
import { MovieReview } from "@/pages";
import { showToast } from "@/utils";

import {
  Content,
  ContentBox,
  TitleSection,
  RatingSelectSection,
  LoginPrompt,
  LoginLink,
  RatingInfoGrid,
  InfoBox,
  AverageBox,
  DeleteButton,
} from "./style";

const MovieRating = ({ movieId, detail, movieData }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { vote_average: voteAverage } = detail;
  const { rating, saveRating, deleteRating, loading, saving, tmdbRating } =
    useRating({ movieId, voteAverage });

  const handleStarClick = async (newRating) => {
    if (!user) {
      showToast.warning("로그인이 필요한 서비스입니다.");
      navigate("/login");
      return;
    }

    const success = await saveRating(newRating);
    if (success) {
      showToast.success("평점이 저장되었습니다!");
    }
  };

  const handleDeleteRating = async () => {
    if (window.confirm("평점을 삭제하시겠습니까?")) {
      const success = await deleteRating();
      if (success) {
        showToast.success("평점이 삭제되었습니다.");
      }
    }
  };

  const getRatingMessage = () => {
    if (rating > 0) return `내가 준 평점: ${rating * 2}점`;
    if (user) return "아직 평점을 주지 않았습니다";
    return "로그인 후 평점을 남겨보세요";
  };

  if (loading) {
    return (
      <Content>
        <ContentBox>
          <Typography variant="body">로딩 중...</Typography>
        </ContentBox>
      </Content>
    );
  }

  return (
    <>
      <Content>
        <ContentBox>
          <TitleSection>
            <Typography variant="h3">별점을 선택해주세요.</Typography>
          </TitleSection>

          {/* 상단: 별점 선택 섹션 */}
          <RatingSelectSection>
            <StarRating
              rating={rating}
              onChange={handleStarClick}
              size="44px"
            />

            {!user && (
              <LoginPrompt>
                <LoginLink onClick={() => navigate("/login")}>로그인</LoginLink>
                <Typography variant="bodyMedium">
                  하고 평점을 남겨보세요!
                </Typography>
              </LoginPrompt>
            )}
          </RatingSelectSection>

          {/* 하단: 평점 정보 박스 2개 */}
          <RatingInfoGrid>
            {/* 실관람객 평점 (TMDB) */}
            <InfoBox>
              <Typography variant="h4">실관람객평점</Typography>
              <AverageBox>
                <Typography variant="body">
                  {voteAverage?.toFixed(1) || 0} / 10점
                </Typography>
                <StarRating
                  rating={tmdbRating}
                  onChange={() => {}}
                  size="30px"
                  readOnly
                />
              </AverageBox>
            </InfoBox>

            {/* 내 평점 */}
            <InfoBox>
              <Typography variant="h4">내 평점</Typography>
              <AverageBox>
                <Typography variant="bodyMedium">
                  {getRatingMessage()}
                </Typography>
                <StarRating
                  rating={rating}
                  onChange={() => {}}
                  size="30px"
                  readOnly
                />
              </AverageBox>

              {rating > 0 && user && (
                <DeleteButton onClick={handleDeleteRating} disabled={saving}>
                  <Typography variant="bodyMedium">
                    {saving ? "처리중..." : "평점 삭제"}
                  </Typography>
                </DeleteButton>
              )}
            </InfoBox>
          </RatingInfoGrid>
        </ContentBox>
      </Content>
      <MovieReview
        movieId={movieId}
        movieData={movieData || detail}
        currentRating={rating}
      />
    </>
  );
};

export default MovieRating;
