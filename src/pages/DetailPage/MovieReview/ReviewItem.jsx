import { Typography, StarRating } from "@/components";
import { formatDate } from "@/utils";
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

  return (
    <ReviewCard>
      <ReviewHeader>
        <UserInfo>
          <Typography variant="caption">{review.user_id || "익명"}</Typography>
          <StarRating size="14px" rating={review.rating} />
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
        <Typography variant="bodySmall">{review.review_text}</Typography>
      </ReviewContent>
    </ReviewCard>
  );
};

export default ReviewItem;
