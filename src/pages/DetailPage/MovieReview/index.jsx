import { Typography } from "@/components";
import { useReview, useAuth } from "@/hooks";
import { ReviewForm, ReviewItem } from "@/pages";
import { getDisplayName } from "@/utils";
import {
  TitleSection,
  EmptyState,
  Content,
  ContentBox,
  ReviewList,
} from "./style";

const MovieReview = ({ movieId, movieData, currentRating }) => {
  const { user } = useAuth();
  const { reviews, myReview, loading, saving, saveReview, deleteReview } =
    useReview(movieId);

  if (loading) {
    return (
      <Content>
        <Typography variant="body">리뷰 불러오는 중...</Typography>
      </Content>
    );
  }

  return (
    <Content>
      <ContentBox>
        <TitleSection>
          <Typography variant="h3">관람평을 남겨보세요.</Typography>
        </TitleSection>

        {reviews.length > 0 ? (
          <ReviewList>
            {reviews.map((review) => (
              <ReviewItem
                key={review.id}
                review={review}
                displayName={getDisplayName(review.user_id)}
                isMyReview={review.user_id === user?.id}
              />
            ))}
          </ReviewList>
        ) : (
          <EmptyState>
            <Typography
              variant="body"
              style={{ color: "rgba(255, 255, 255, 0.6)" }}
            >
              아직 작성된 관람평이 없습니다.
            </Typography>
          </EmptyState>
        )}
        <ReviewForm
          myReview={myReview}
          saving={saving}
          onSave={saveReview}
          onDelete={deleteReview}
          currentRating={currentRating}
          movieData={movieData}
        />
      </ContentBox>
    </Content>
  );
};

export default MovieReview;
