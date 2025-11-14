import styled from "@emotion/styled";
import Typography from "./Typography";
import { getImageUrl } from "@/constants/images";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const PosterWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 150%; /* 2:3 비율 = (3/2) * 100% = 150% */
  overflow: hidden;
  border-radius: 8px;
  background-color: #1a1a1a; /* 로딩 중 배경색 */
  margin-bottom: 8px;
`;

const Poster = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
    z-index: 10;
  }
`;

const RankBadge = styled.div`
  margin-bottom: 4px;
`;

const TitleWrapper = styled.div`
  margin-top: 8px;
  min-height: 48px; /* 제목 최소 높이 */
`;

const MovieCard = ({ title, poster, onClick, rank, size = "w500" }) => {
  return (
    <Card>
      {rank !== undefined && (
        <RankBadge>
          <Typography
            variant="caption"
            color="#ff1a66"
            style={{ fontWeight: "bold" }}
          >
            #{rank}
          </Typography>
        </RankBadge>
      )}
      <PosterWrapper onClick={onClick}>
        <Poster src={getImageUrl(poster, size)} alt={title} loading="lazy" />
      </PosterWrapper>
      <TitleWrapper>
        <Typography
          variant="movieTitle"
          as="p"
          style={{
            fontSize: "16px",
            fontWeight: "500",
            lineHeight: "1.4",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {title}
        </Typography>
      </TitleWrapper>
    </Card>
  );
};

export default MovieCard;
