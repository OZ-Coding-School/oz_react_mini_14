import { useState } from "react";
import { Star } from "@/components";
import styled from "@emotion/styled";

const StarRating = ({
  rating = 0,
  onChange,
  size = "44px",
  readOnly = false,
}) => {
  const [hoverRatings, setHoverRatings] = useState(0);

  const calculateRating = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isLeftHlaf = x < rect.width / 2;
    return isLeftHlaf ? index + 0.5 : index + 1;
  };

  const handleStarClick = (e, index) => {
    if (readOnly || !onChange) return;
    onChange(calculateRating(e, index));
  };

  const handleMove = (e, index) => {
    if (readOnly) return;
    setHoverRatings(calculateRating(e, index));
  };

  const getStarValue = (index) => {
    const activeRating = hoverRatings || rating;
    if (index >= activeRating) return 0;
    if (index + 1 <= activeRating) return 1;
    return activeRating - index;
  };

  return (
    <RatingsWrapper onMouseLeave={() => setHoverRatings(0)} readOnly={readOnly}>
      {[0, 1, 2, 3, 4].map((index) => (
        <span
          key={index}
          onClick={(e) => handleStarClick(e, index)}
          onMouseMove={(e) => handleMove(e, index)}
        >
          <Star value={getStarValue(index)} size={size} />
        </span>
      ))}
    </RatingsWrapper>
  );
};

export default StarRating;

const RatingsWrapper = styled.div`
  display: inline-flex;
  gap: 4px;
  cursor: ${(props) => (props.readOnly ? "default" : "pointer")};

  & > span {
    display: inline-block;
  }
`;
