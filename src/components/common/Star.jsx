import styled from "@emotion/styled";

const Star = ({ value = 0, size = "44px" }) => {
  const numericSize = parseInt(size);

  return (
    <StarWrapper size={size}>
      <svg
        width={numericSize}
        height={numericSize}
        viewBox="0 0 24 24"
        fill="none"
      >
        {/* 빈 별 (회색 테두리) */}
        <path
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          fill="#d9d9d9"
        />
        {/* 채워진 별 (핑크) */}
        <defs>
          <clipPath id={`clip-${value}-${size}`}>
            <rect x="0" y="0" width={`${value * 100}%`} height="100%" />
          </clipPath>
        </defs>
        <path
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          fill="#ff1a66"
          clipPath={`url(#clip-${value}-${size})`}
        />
      </svg>
    </StarWrapper>
  );
};

export default Star;

const StarWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
`;
