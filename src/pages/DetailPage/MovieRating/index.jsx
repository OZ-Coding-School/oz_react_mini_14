import { useRating, useAuth } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { Typography, StarRating } from "@/components";
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

const MovieRating = ({ detail, movieId }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { rating, loading, saving, saveRating, deleteRating } = useRating(
    movieId,
    detail.title,
    detail.poster_path
  );

  // TMDB 평점을 5점 만점으로 변환
  const tmdbRating = detail.vote_average
    ? Math.round(detail.vote_average / 2)
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

  const getRatingMessage = () => {
    if (rating > 0) return `내가 준 평점: ${rating * 2}점`;
    if (user) return "아직 평점을 주지 않았습니다";
    return "로그인 후 평점을 남겨보세요";
  };

  if (loading) {
    return (
      <Content>
        <ContentBox>
          <Typography variant="body">평점 불러오는 중...</Typography>
        </ContentBox>
      </Content>
    );
  }

  return (
    <Content>
      <ContentBox>
        <TitleSection>
          <Typography variant="h3">별점을 선택해주세요.</Typography>
        </TitleSection>

        {/* 상단: 별점 선택 섹션 */}
        <RatingSelectSection>
          <StarRating
            size="44px"
            rating={rating}
            onRatingChange={handleStarClick}
            interactive={true}
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
            <Typography variant="h3">실관람객평점</Typography>
            <AverageBox>
              <Typography variant="body">
                {detail.vote_average?.toFixed(1) || 0} / 10점
              </Typography>
              <StarRating rating={tmdbRating} />
            </AverageBox>
          </InfoBox>

          {/* 내 평점 */}
          <InfoBox>
            <Typography variant="h3">내 평점</Typography>
            <AverageBox>
              <Typography variant="body">{getRatingMessage()}</Typography>
              <StarRating rating={rating} />
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
  );
};

export default MovieRating;
