import { useState, useEffect } from "react";
import { showToast } from "@/utils";

const useReviewEdit = ({
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
      showToast.warning("리뷰 내용을 입력해주세요!");
      return;
    }
    const success = await onSave(reviewText, currentRating, movieData);

    if (success) {
      setIsEditing(false);
      showToast.success(
        myReview ? "리뷰가 수정되었습니다!" : "리뷰가 작성되었습니다!"
      );
    } else {
      showToast.error("리뷰 저장 실패!");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("리뷰를 삭제하시겠습니까?")) {
      const success = await onDelete();
      if (success) {
        setReviewText("");
        setIsEditing(false);
        showToast.success("리뷰가 삭제되었습니다.");
      } else {
        showToast.error("리뷰 삭제 실패!");
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

  return {
    isEditing,
    setIsEditing,
    reviewText,
    setReviewText,
    handleSubmit,
    handleDelete,
    handleCancel,
    getButtonText,
  };
};
export default useReviewEdit;
