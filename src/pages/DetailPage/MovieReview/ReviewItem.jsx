import { Typography, StarRating } from "@/components";
import {
  ReviewCard,
  ReviewHeader,
  UserInfo,
  ReviewDate,
  ReviewContent,
} from "./style";

const ReviewItem = ({ review }) => {
  if (!review || !review.user_id) {
    return null;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (seconds < 60) return "방금 전";
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;

    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <ReviewCard>
      <ReviewHeader>
        <UserInfo>
          <Typography variant="h5">{review.user_id || "익명"}</Typography>
          <StarRating rating={review.rating} />
        </UserInfo>
        <ReviewDate>
          <Typography
            variant="caption"
            style={{ color: "rgba(255, 255, 255, 0.5)" }}
          >
            {formatDate(review.created_at)}
          </Typography>
        </ReviewDate>
      </ReviewHeader>

      <ReviewContent>
        <Typography variant="body">{review.review_text}</Typography>
      </ReviewContent>
    </ReviewCard>
  );
};

export default ReviewItem;
