import { useState } from "react";
import { Icon } from "@/components";
import styled from "@emotion/styled";

const StarRating = ({
  rating,
  onRatingChange,
  size = "30px",
  activeColor = "#ff1a66",
  inactiveColor = "#d9d9d9",
  interactive = false,
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (star) => {
    if (interactive && onRatingChange) {
      onRatingChange(star);
    }
  };

  const handleMouseEnter = (star) => {
    if (interactive) {
      setHoverRating(star);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0);
    }
  };

  return (
    <StarContainer interactive={interactive} size={size}>
      {[1, 2, 3, 4, 5].map((star) => (
        <StarButton
          key={star}
          onClick={() => handleClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          interactive={interactive}
          disabled={!interactive}
        >
          <Icon
            name="starSolid"
            size={size}
            color={
              star <= (hoverRating || rating) ? activeColor : inactiveColor
            }
          />
        </StarButton>
      ))}
    </StarContainer>
  );
};

export default StarRating;

const StarContainer = styled.div`
  display: flex;
  gap: ${({ interactive }) => (interactive ? "12px" : "8px")};

  ${({ interactive }) =>
    !interactive &&
    `
  svg {
    font-size: ${({ size }) => size} !important;
    width: ${({ size }) => size};
    height: ${({ size }) => size};
  }
  `}

  @media (max-width: 768px) {
    gap: ${({ interactive }) => (interactive ? "8px" : "4px")};

    svg {
      font-size: 30px !important;
      width: 30px;
      height: 30px;
    }
  }
`;

const StarButton = styled.button`
  background: transparent;
  border: none;
  cursor: ${({ interactive }) => (interactive ? "pointer" : "default")};
  padding: 0;
  margin-top: 12px;
  transition: ${({ interactive }) =>
    interactive ? "transform 0.2s ease" : "none"};
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ interactive }) =>
    interactive &&
    `
    &:hover:not(:disabled) {
      transform: scale(1.15);
    }
  `}

  &:disabled {
    cursor: not-allowed;
    opacity: ${({ interactive }) => (interactive ? "0.6" : "1")};
  }

  @media (max-width: 768px) {
    margin-top: 8px;
  }
`;
