import { Typography } from "@/components";
import { useReview, useAuth } from "@/hooks";
import { TitleSection, EmptyState, Content, ContentBox } from "./style";
import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem";

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

  const otherReviews = reviews.filter((review) => review.user_id !== user?.id);
  return (
    <Content>
      <ContentBox>
        <TitleSection>
          <Typography variant="h3">관람평을 남겨보세요.</Typography>
        </TitleSection>

        <ReviewForm
          myReview={myReview}
          saving={saving}
          onSave={saveReview}
          onDelete={deleteReview}
          currentRating={currentRating}
          movieData={movieData}
        />

        {otherReviews.length > 0 ? (
          <ReviewList>
            {otherReviews.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </ReviewList>
        ) : (
          <EmptyState>
            <Typography
              variant="body"
              style={{ color: "rgba(255, 255, 255, 0.6" }}
            >
              아직 작성된 관람평이 없습니다.
            </Typography>
          </EmptyState>
        )}
      </ContentBox>
    </Content>
  );
};
export default MovieReview;
