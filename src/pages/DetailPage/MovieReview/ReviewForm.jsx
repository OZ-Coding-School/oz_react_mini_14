import { useReviewEdit } from "@/hooks";
import { Typography, Button } from "@/components";
import {
  FormContainer,
  TextArea,
  ButtonGroup,
  MyReviewBox,
  TitleSection,
} from "./style";

const ReviewForm = ({
  myReview,
  saving,
  onSave,
  onDelete,
  currentRating,
  movieData,
}) => {
  // 훅 호출
  const {
    isEditing,
    setIsEditing,
    reviewText,
    setReviewText,
    handleSubmit,
    handleDelete,
    handleCancel,
    getButtonText,
  } = useReviewEdit({
    myReview,
    saving,
    onSave,
    onDelete,
    currentRating,
    movieData,
  });

  // 평점이 없으면 리뷰 작성 불가
  if (!currentRating) {
    return (
      <FormContainer>
        <Typography
          variant="caption"
          style={{ color: "rgba(255, 255, 255, 0.5)" }}
        >
          리뷰를 작성하려면 먼저 평점을 남겨주세요.
        </Typography>
      </FormContainer>
    );
  }

  // 내 리뷰가 있고 수정 중이 아닌 경우
  if (myReview && !isEditing) {
    return (
      <FormContainer>
        <TitleSection>
          <Typography variant="h3">내 리뷰</Typography>
        </TitleSection>
        <MyReviewBox>{myReview.review_text}</MyReviewBox>
        <ButtonGroup>
          <Button onClick={() => setIsEditing(true)} variant="secondary">
            수정
          </Button>
          <Button onClick={handleDelete} variant="danger" disabled={saving}>
            삭제
          </Button>
        </ButtonGroup>
      </FormContainer>
    );
  }

  // 리뷰 작성/수정 폼
  return (
    <FormContainer>
      <Typography variant="h4" style={{ marginBottom: "16px" }}>
        {myReview ? "리뷰 수정" : "리뷰 작성"}
      </Typography>
      <TextArea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="이 영화에 대한 생각을 자유롭게 작성해주세요."
        rows={6}
      />
      <ButtonGroup>
        <Button onClick={handleSubmit} disabled={saving || !reviewText.trim()}>
          {getButtonText()}
        </Button>
        {isEditing && (
          <Button onClick={handleCancel} variant="secondary">
            취소
          </Button>
        )}
      </ButtonGroup>
    </FormContainer>
  );
};

export default ReviewForm;
