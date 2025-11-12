import styled from "@emotion/styled";
import Typography from "./Typhography";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease;
`;

const Poster = styled.img`
  width: 100%;
  cursor: pointer;
  width: 270px;
  height: auto;
  aspect-ratio: 2/3;
  border-radius: 8px;
  object-fit: cover;
  margin-bottom: 8px;
  transition: transform 0.3 ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
    z-index: 10;
  }
`;

const RankBadge = styled.div`
  margin-bottom: 4px;
`;

const MovieCard = ({ title, poster, onClick, rank }) => {
  return (
    <Card onClick={onClick}>
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
      <Poster src={poster} alt={title} />
      <Typography
        variant="movieTitle"
        tag="p"
        style={{
          marginTop: "8px",
          marginBottom: "16px",
          fontSize: "16px",
          fontWeight: "700",
        }}
      >
        {title}
      </Typography>
    </Card>
  );
};

export default MovieCard;
