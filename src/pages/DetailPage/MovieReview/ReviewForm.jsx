import { useState, useEffect } from "react";
import { Typography, Button } from "@/components";
import { FormContainer, TextArea, ButtonGroup, MyReviewBox } from "./style";

const ReviewForm = ({
  myReview,
  saving,
  onSave,
  onDelete,
  currentRating,
  movieData,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    if (myReview) {
      setReviewText(myReview.review_text);
    }
  }, [myReview]);

  const handleSubmit = async () => {
    if (!reviewText.trim()) {
      alert("리뷰 내용을 입력해주세요!");
      return;
    }
    const success = await onSave(reviewText, currentRating, movieData);
    if (success) {
      setIsEditing(false);
      alert(myReview ? "리뷰가 수정되었습니다!" : "리뷰가 작성되었습니다!");
    } else {
      alert("리뷰 저장 실패!");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("리뷰를 삭제하시겠습니까?")) {
      const success = await onDelete();
      if (success) {
        setReviewText("");
        setIsEditing(false);
        alert("리뷰가 삭제되었습니다.");
      } else {
        alert("리뷰 삭제 실패!");
      }
    }
  };

  const handleCancel = () => {
    if (myReview) {
      setReviewText(myReview.review_text);
    } else {
      setReviewText("");
    }
    setIsEditing(false);
  };

  const getButtonText = () => {
    if (saving) return "저장 중...";
    if (myReview) return "수정하기";
    return "작성하기";
  };

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
        <h3>내 리뷰</h3>
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
